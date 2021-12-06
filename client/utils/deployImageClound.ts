export const deployImageCloud = async (formData: FormData): Promise<string> => {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dadjiatxx/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );
  const data: { url: string } = await res.json();
  return data.url;
};
