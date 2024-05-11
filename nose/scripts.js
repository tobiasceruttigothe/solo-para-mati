document.addEventListener("DOMContentLoaded", function(){
   cargarMuseos();
   const form = document.getElementById('filterForm');
   form.addEventListener('submit', async function (event){
      event.preventDefault();
      buscarMuseo(form.nombre.value);
   })
})
const cargarMuseos = () => {
   const museos = fetch('http://localhost:3000/museos');
   museos
   .then((respuesta)=>{
      return respuesta.json();
   })
   .then((listaMuseos) => {
      const tablaMuseos = document.getElementById("lista-museos"); 
      tablaMuseos.innerHTML = '';
      for(let museo of listaMuseos){
         const row = `
            <tr>
            <td> ${museo.nombre}</td>
            <td> ${museo.ubicacion}</td>
            <td> ${museo.exposiciones}</td>
            <td> ${museo.horarios}</td>
            <td> ${museo.precioEntrada}</td>
            </tr>
         `;
         tablaMuseos.innerHTML += row;
      }
   })
   .catch((error) => console.log("Error al cargar los museos: ", error));
};


async function buscarMuseo(nombres){
   try{
      const response = await fetch(`http://localhost:3000/museos/buscarMuseo?nombre=${nombres}`);
      const data = await response.json();

      const tbody = document.getElementById("lista-museos")
      tbody.innerHTML = '';
      data.forEach(museo => {
         const row = document.createElement('tr');
         row.innerHTML = `
         <td>${museo.nombre}</td>
         <td>${museo.ubicacion}</td>
         <td>${museo.exposiciones}</td>
         <td>${museo.horarios}</td>
         <td>${museo.precioEntrada}</td>
         `;
         tbody.appendChild(row);
      });
   }
   catch(error){
      console.log(error, "error al cargarlos museos buscados")
   }
}