export async function fetcher(url, options = {header: {'Authorization' :  'Bearer ' + process.env.NEXT_PUBLIC_API_TOKEN}}) {
    let response;
    if (!options) {
      response = await fetch(url);
    } else {
      response = await fetch(url, options);
    }
    const data = await response.json();
    return data;
  }