using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion
{
    public class CapacidadAplicacion : IGeneralAplicacion<ENCapacidad>
    {
        private CapacidadRepositorio CapacidadRepositorio;
        public CapacidadAplicacion(CapacidadRepositorio CapacidadRepositorio)
        {
            this.CapacidadRepositorio = CapacidadRepositorio;
        }

        public Response Actualizar(Request<ENCapacidad> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = CapacidadRepositorio.Actualizar(entidad.entidad);
                retorno.Success = true;
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response Eliminar(Request<ENCapacidad> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<ENCapacidad> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENCapacidad>> Listar(Request<ENCapacidad> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ENCapacidad>> ListarPaginado(Request<ENCapacidad> entidad)
        {
            Response<List<ENCapacidad>> retorno = new Response<List<ENCapacidad>>();

            try
            {
                DataTable dt = CapacidadRepositorio.ListarPaginado(entidad.entidad);
                List<ENCapacidad> lista = new List<ENCapacidad>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENCapacidad()
                    {
                        IdCapacidad = Util.CapturaInt0(row, "IdCapacidad"),
                        PlantaServicio = Util.CapturaInt0(row, "PlantaServicio"),
                        PlantaServicioDes = Util.CapturaString(row, "PlantaServicioDes"),
                        Horas = Util.CapturaInt0(row, "Horas"),
                        Minutos = Util.CapturaInt0(row, "Minutos"),
                        PersonalLinea = Util.CapturaInt0(row, "PersonalLinea"),
                        EficienciaLinea = Util.CapturaDecimal(row, "EficienciaLinea"),
                        Cuota = Util.CapturaDecimal(row, "Cuota"),
                        Capacidad = Util.CapturaInt0(row, "Capacidad"),
                    });
                }

                retorno.error = false;
                retorno.response = lista;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
    }

}


