import { NextRequest, NextResponse } from 'next/server';

import ExcelJS from 'exceljs';
declare class Customer {
    memberNumber: string;
    name: string;
    coexTotal: number;
    grafanaEntries: GrafanaEntry[];
}

declare class GrafanaEntry {
    date: string;
    amount: number;
    item: string;
}


async function generateSharedCustomerList(coexFile: File, grafanaFile: File): Promise<Customer[]> {
    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = await coexFile.arrayBuffer();


    const coexCustomers: Customer[] = [];
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.getWorksheet(1); // Get first sheet
    worksheet?.eachRow((row, rowNumber) => {
        console.log(`Row ${rowNumber}:`, row.values);
    });
        console.log(grafanaFile)


    console.log('Coex Customers:', coexCustomers);



    return coexCustomers;

}
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const coexFile = formData.get('coexFile') as File;
    const grafanaFile = formData.get('grafanaFile') as File;

    console.log('Uploaded files:', {
      coexFile: coexFile?.name,
      grafanaFile: grafanaFile?.name
    });

    generateSharedCustomerList(coexFile, grafanaFile);


    return NextResponse.json({
      message: 'Files received',
      coexFile: coexFile?.name || null,
      grafanaFile: grafanaFile?.name || null,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error parsing form data' }, { status: 500 });
  }
}