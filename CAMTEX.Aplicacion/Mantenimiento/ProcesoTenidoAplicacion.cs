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
    public class ProcesoTenidoAplicacion : IGeneralAplicacion<ProcesoTenido>
    {
        private ProcesoTenidoRepositorio ProcesoTenidoRepositorio;
        public ProcesoTenidoAplicacion(ProcesoTenidoRepositorio ProcesoTenidoRepositorio)
        {
            this.ProcesoTenidoRepositorio = ProcesoTenidoRepositorio;
        }
        public Response Actualizar(Request<ProcesoTenido> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<ProcesoTenido> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<ProcesoTenido> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ProcesoTenido>> Listar(Request<ProcesoTenido> entidad)
        {
            Response<List<ProcesoTenido>> retorno = new Response<List<ProcesoTenido>>();

            try
            {
                DataTable dt = ProcesoTenidoRepositorio.Listar(entidad.entidad);
                List<ProcesoTenido> lista = new List<ProcesoTenido>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ProcesoTenido()
                    {
                        ProcesoTenidoID =  int.Parse( row["ProcesoTenidoID"].ToString() ),
                        ProcesoCodigo = row["ProcesoCodigo"] != DBNull.Value ? row["ProcesoCodigo"].ToString() : string.Empty,
                        ProcesoDescripcion = row["ProcesoDescripcion"] != DBNull.Value ? row["ProcesoDescripcion"].ToString() : string.Empty,
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

        public Response<List<ProcesoTenido>> ListarPaginado(Request<ProcesoTenido> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
