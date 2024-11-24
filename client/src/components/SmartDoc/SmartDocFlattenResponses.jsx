import * as XLSX from 'xlsx';



export const flattenObject = (obj, parent = '', res = {}) => {
    for (let key in obj) {
      let propName = parent ? `${parent}.${key}` : key;
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          flattenObject(item, `${propName}[${index}]`, res);
        });
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        flattenObject(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
    return res;
};

export const jsonToTableData = (json) => {
  if (!json || !Array.isArray(json) || json.length === 0) {
    return { headers: [], rows: [] };
  }

  const flattenedJson = json.map(item => flattenObject(item));
  const headers = Array.from(new Set(flattenedJson.flatMap(item => Object.keys(item))));
  const rows = flattenedJson.map(item => headers.map(header => item[header] || ''));

  return { headers, rows };
};

export const jsonToExcel = (json) => {
  const { headers, rows } = jsonToTableData(json);
  // console.log('Headers:', headers);
  // console.log('Rows:', rows);
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  return workbook;
};

export const downloadExcel = (workbook, filename) => {
  XLSX.writeFile(workbook, filename);
};
