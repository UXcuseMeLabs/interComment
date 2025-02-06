export function formatDate(dateInput: string) {
    const date = new Date(dateInput);
  
    if (isNaN(date.getTime())) {
      throw new Error("Fecha inválida");
    }
  
    // Obtiene los valores con padding de ceros cuando es necesario
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque enero es 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }