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
    public class ACFB01Aplicacion: IGeneralAplicacion<ACFB01>
    {
        private ACFB01Repositorio ACFB01Repositorio;

        public ACFB01Aplicacion(ACFB01Repositorio aCFB01Repositorio)
        {
            ACFB01Repositorio = aCFB01Repositorio;
        }

        public Response Actualizar(Request<ACFB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ACFB01Repositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ACFB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ACFB01Repositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ACFB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ACFB01Repositorio.Insertar(entidad.entidad);
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

        public Response<List<ACFB01>> Listar(Request<ACFB01> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ACFB01>> ListarPaginado(Request<ACFB01> entidad)
        {
            Response<List<ACFB01>> retorno = new Response<List<ACFB01>>();

            try
            {
                DataTable dt = ACFB01Repositorio.ListarPaginado(entidad.entidad);
                List<ACFB01> lista = new List<ACFB01>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ACFB01()
                    {
                        AcfCCOD = Util.CapturaString(row, "AcfCCOD"),
                        AcfDdes = Util.CapturaString(row, "AcfDdes"),
                        AcfDMne = Util.CapturaString(row, "AcfDMne"),
                        AcfNewSis = Util.CapturaString(row, "AcfNewSis"),
                        ESTADO = Util.CapturaString(row, "AcfSest"),
                        FechaReg = Util.CapturaDatetime(row, "AcfFLog1"),
                        USUARIO_REG = Util.CapturaString(row, "AcfULog1"),
                        HOST_REG = Util.CapturaString(row, "AcfWLog1"),
                        FECHA_ACT = Util.CapturaDatetime(row, "AcfFMod"),
                        USUARIO_ACT = Util.CapturaString(row, "AcfUMod"),
                        HOST_ACT = Util.CapturaString(row, "AcfWMod"),

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
