import { NextRequest, NextResponse } from 'next/server';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import * as XLSX from "xlsx";

type Address = {
    SingleLineAddress: string;
    StreetAddress: string;
    Suburb: string;
    State: string;
    Postcode: string;
};

type Customer = {
    CompanyName: string;
    ContactName: string;
    PhoneNumber: string;
    Email: string;
    Address: Address;
    MemberNumber: string;
    Notes: string;
    Bins: number;
};

type Row = {
    [key: string]: string | number | bigint | undefined | null;
};

function getRunTitle(date: Date = new Date()): string {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[date.getDay()];

    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();
    const year = date.getFullYear() % 100; // Two-digit year

    return `${dayName} Run ${month}/${day}/${year}`;
}

function getBinCountFromRow(row: Row) {
    if (row['240L'] != null) {
        return parseInt(String(row['240L']))
    }
    if (row['110L'] != null) {
        return parseInt(String(row['110L']))
    }

    if (row['660L'] != null) {
        return parseInt(String(row['660L']))
    }

    if (row['1100L'] != null) {
        return parseInt(String(row['1100L']))
    }

    return 0


}

function rowToCustomer(row: Row): Customer {
    return {
        CompanyName: row["__EMPTY_1"] != null ? String(row["__EMPTY_1"]) : "",
        ContactName: row["Contact "] != null ? String(row["Contact "]) : "",
        PhoneNumber: row["Phone"] != null ? String(row["Phone"]) : "",
        Email: row["Email"] != null ? String(row["Email"]) : "",
        Address: {
            SingleLineAddress: row["Address"] != null ? String(row["Address"]) : "",
            StreetAddress: row["Street"] != null ? String(row["Street"]) : "",
            Suburb: row["Suburb"] != null ? String(row["Suburb"]) : "",
            State: row["State"] != null ? String(row["State"]) : "",
            Postcode: row["Postcode"] != null ? String(row["Postcode"]) : "",
        },
        MemberNumber: row["Member number "] != null ? String(row["Member number "]) : "",
        Notes: row["Notes"] != null ? String(row["Notes"]) : "",
        Bins: getBinCountFromRow(row),

    }
}

async function generateManifest(buffer: ArrayBuffer) {
    const workbook = XLSX.read(buffer, { type: "array" });

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert to JSON (array of objects)
    const rows: Row[] = XLSX.utils.sheet_to_json(sheet);

    const customers: Customer[] = rows.map(rowToCustomer).filter(c => {
        console.log(c.Address.SingleLineAddress)
        return c.CompanyName != "" || c.ContactName != ""
    });

    const res = await fetch("https://pub-d3c1780dc09a40659cc37fe6ae6e2937.r2.dev/template.docx");
    const docxBuffer = await res.arrayBuffer();
   
    const doc = new Docxtemplater(new PizZip(docxBuffer), {
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render({
        runTitle: getRunTitle(),
        customers: customers
    })
    return doc.getZip().generate({
        type: "nodebuffer",
        /*
         * Compression: DEFLATE adds a compression step.
         * For a 50MB document, expect 500ms additional CPU time.
         */
        compression: "DEFLATE",
    });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const customerList = formData.get('customerList') as File;
    const buffer = await customerList.arrayBuffer();
    const manifest = await generateManifest(buffer);
    return new NextResponse(new Uint8Array(manifest), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="manifest.docx"',
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error parsing form data' }, { status: 500 });
  }
}