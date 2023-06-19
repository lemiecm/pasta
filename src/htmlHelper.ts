import { parse } from 'node-html-parser';
import * as yaml from 'js-yaml';

interface PropertyInfo {
  name: string;
  type: string;
  required: string;
  nullable: string;
}


export function extractClassInfoFromHtml(htmlContent: string): string {
  const root = parse(htmlContent);
  console.log("dupa");
  const tables = root.querySelectorAll('table');
  var classes : any[] = [];
  // Extract class information from each table
  tables.forEach(table => {
    const rows = table.querySelectorAll('tr');
    console.log(rows);
    var properties : PropertyInfo[] = [];
    // Extract property details from table rows
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll('td');
      const propertyInfo: PropertyInfo = {
        name: cells[0].text,
        type: cells[1].text,
        required: cells[2].text.includes('x') ? 'x' : '',
        nullable: cells[3].text.includes('x') ? 'x' : ''
      };
      properties.push(propertyInfo);
    }

    classes.push(properties);
  });

  return yaml.dump(classes);
}
