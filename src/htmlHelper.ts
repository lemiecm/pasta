import { parse } from 'node-html-parser';

interface ClassInfo{
  name: string,
  properties: PropertyInfo[] | undefined,
}

interface PropertyInfo {
  name: string,
  type: string;
  required: string;
  nullable: string;
}
const html =`<!DOCTYPE html>
<html>
  <head>
    <title>Class Info Example</title>
  </head>
  <body>
    <h2>Class 1</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Nullable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>property1</td>
          <td>string</td>
          <td>x</td>
          <td></td>
        </tr>
        <tr>
          <td>property2</td>
          <td>number</td>
          <td></td>
          <td>x</td>
        </tr>
      </tbody>
    </table>
    <h2>Class 2</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Nullable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>property1</td>
          <td>string</td>
          <td>x</td>
          <td></td>
        </tr>
        <tr>
          <td>property2</td>
          <td>number</td>
          <td></td>
          <td>x</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;

export function extractClassInfoFromHtml(htmlContent: string): string {
  //const root = parse(htmlContent);
  const root = parse(html);
  console.log(root);
  const tables = root.querySelectorAll('table');
  const titles = root.querySelectorAll('h2');
  console.log(titles[1].text);
  var classes : ClassInfo[] = [];
  // Extract class information from each table
  tables.forEach((table, index) => {
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
  
    classes.push({
      name: titles[index].text,
      properties: properties
    });
    
  });

  return toYaml(classes);
}

function toYaml(classes: ClassInfo[]): string {
  var res = '';
  const spaces = '  ';
  var req = spaces + spaces + 'required:\n'
  classes.forEach((singleClass, index) => {
    res += singleClass.name + '\n';
    res += spaces + 'properties:\n'
    if(singleClass.properties != undefined)
    {
      singleClass.properties.forEach((property, indexK)  => {
        res += spaces + (spaces + property.name + '\n');
        res += spaces + (spaces + spaces + 'type: ' + property.type + '\n');
        req += spaces + (property.required ? spaces + spaces + spaces + ' - '+ property.name + '\n' : '')
      });
    }
    res += req;
    req = spaces + spaces + 'required:\n';
  });
  return res
}