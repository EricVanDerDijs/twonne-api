module.exports.singleLineString = (string_arr) => {
  // remove carriage returns and new lines
  let single_line_string = string_arr[0].replace(/(?:\r\n|\n|\r)/gm, '');
  // remove identations and extra spaces
  single_line_string = string_arr[0].replace(/(\s{2,}|\t)/g, ' ');
  // and trim the result
  return single_line_string.trim();
}