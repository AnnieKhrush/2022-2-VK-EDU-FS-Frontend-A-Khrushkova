/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  // your solution goes here
  if (typeof(bytes) === 'number' && Number(bytes) > 0) {
    const multiple_of_bytes = ["B", "KB", "MB", "GB", "TB"];
    const bytes1 = bytes;
    let count = 0;
    while (bytes >= 1024) {
      bytes /= 1024;
      count += 1;
    }
    if (bytes == 1 || count == 0) {
      return bytes1 / (1024 ** count) + " " + multiple_of_bytes[count];
    }
    return (bytes1 / (1024 ** count)).toFixed(2) + " " + multiple_of_bytes[count];
  }
  else {
    return false;
  }
}
