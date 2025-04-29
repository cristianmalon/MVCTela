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
    public class ETJB04Aplicacion: IGeneralAplicacion<ETJB04>
    {
        private ETJB04Repositorio ETJB04Repositorio;

        public ETJB04Aplicacion(ETJB04Repositorio eTJB04Repositorio)
        {
            ETJB04Repositorio = eTJB04Repositorio;
        }

        public Response Actualizar(Request<ETJB04> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ETJB04Repositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ETJB04> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ETJB04Repositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ETJB04> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ETJB04Repositorio.Insertar(entidad.entidad);
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

        public Response<List<ETJB04>> Listar(Request<ETJB04> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ETJB04>> ListarPaginado(Request<ETJB04> entidad)
        {
            Response<List<ETJB04>> retorno = new Response<List<ETJB04>>();

            try
            {
                DataTable dt = ETJB04Repositorio.ListarPaginado(entidad.entidad);
                List<ETJB04> lista = new List<ETJB04>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ETJB04()
                    {
                        //ETJCCOD = Util.CapturaString(row, "ETJCCOD"),
                        ETjCTDi = Util.CapturaString(row, "ETjCTDi"),
                        ETjDTDi = Util.CapturaString(row, "ETjDTDi"),
                        ETjDMne = Util.CapturaString(row, "ETjDMne"),
                        ESTADO = Util.CapturaString(row, "ETjSEst"),
                        FechaReg = Util.CapturaDatetime(row, "ETjFLogC4"),
                        USUARIO_REG = Util.CapturaString(row, "ETjULogC4"),
                        HOST_REG = Util.CapturaString(row, "ETjWLogC4"),
                        FECHA_ACT = Util.CapturaDatetime(row, "ETjFLogM4"),
                        USUARIO_ACT = Util.CapturaString(row, "ETjULogM4"),
                        HOST_ACT = Util.CapturaString(row, "ETjWLogM4"),

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
