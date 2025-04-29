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
    public class ETJB02Aplicacion: IGeneralAplicacion<ETJB02>
    {
        private ETJB02Repositorio ETJB02Repositorio;

        public ETJB02Aplicacion(ETJB02Repositorio eTJB02Repositorio)
        {
            ETJB02Repositorio = eTJB02Repositorio;
        }

        public Response Actualizar(Request<ETJB02> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ETJB02Repositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ETJB02> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ETJB02Repositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ETJB02> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ETJB02Repositorio.Insertar(entidad.entidad);
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

        public Response<List<ETJB02>> Listar(Request<ETJB02> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ETJB02>> ListarPaginado(Request<ETJB02> entidad)
        {
            Response<List<ETJB02>> retorno = new Response<List<ETJB02>>();

            try
            {
                DataTable dt = ETJB02Repositorio.ListarPaginado(entidad.entidad);
                List<ETJB02> lista = new List<ETJB02>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ETJB02()
                    {
                        //ETJCCOD = Util.CapturaString(row, "ETJCCOD"),
                        ETjCDis = Util.CapturaString(row, "ETjCDis"),
                        ETjDDis = Util.CapturaString(row, "ETjDDis"),
                        ETjDMne = Util.CapturaString(row, "ETjDMne"),
                        ESTADO = Util.CapturaString(row, "ETjSEst"),
                        FechaReg = Util.CapturaDatetime(row, "ETjFLogC2"),
                        USUARIO_REG = Util.CapturaString(row, "ETjULogC2"),
                        HOST_REG = Util.CapturaString(row, "ETjWLogC2"),
                        FECHA_ACT = Util.CapturaDatetime(row, "ETjFLogM2"),
                        USUARIO_ACT = Util.CapturaString(row, "ETjULogM2"),
                        HOST_ACT = Util.CapturaString(row, "ETjWLogM2"),

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
