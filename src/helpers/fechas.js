export const parsearFecha = (fecha) => {
  const arraySplitted = fecha.split("T");

  console.log(arraySplitted[0]);

  const barraFecha = arraySplitted[0].replace(/-/g, "/");
  console.log(barraFecha);
  return barraFecha;
};
