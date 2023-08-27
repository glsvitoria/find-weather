export default async function readFileAsDataURL(
  file: File,
): Promise<string | ArrayBuffer | null> {
  const result_base64 = await new Promise<string | ArrayBuffer | null>(
    resolve => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    },
  );

  return result_base64;
}
