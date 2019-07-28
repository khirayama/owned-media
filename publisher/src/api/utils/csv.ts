/* eslint-disable @typescript-eslint/camelcase */
import npmCsvParse from 'csv-parse/lib/sync';
import npmCdvStringify from 'csv-stringify/lib/sync';

export function csvStringify(data: any[], columns: string[]) {
  const csvString = npmCdvStringify(data, {
    header: true,
    columns: columns,
  });

  return csvString;
}

export function csvParse(csvString: string): any {
  const records = npmCsvParse(csvString, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}
