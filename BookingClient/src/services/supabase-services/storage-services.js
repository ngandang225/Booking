import supabase from "./supabase"
async function uploadFile(file,bucket,folder) {
    const date =new Date().toJSON();
    const { data, error } = await supabase.storage.from(bucket).upload(`${folder}/${file.name}/${date}`, file)
    if (error) {
      // Handle error
    } else {
      // Handle success
    }
    const url = await supabase.storage
    .from('Booking')
    .getPublicUrl(`${folder}/${file.name}/${date}`);
  return url.data.publicUrl;
  }

  export const storageServices ={uploadFile}