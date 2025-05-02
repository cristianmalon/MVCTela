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
    public class TECB01Aplicacion: IGeneralAplicacion<TECB01>
    {
        private TECB01Repositorio TECB01Repositorio;

        public TECB01Aplicacion(TECB01Repositorio tECB01Repositorio)
        {
            TECB01Repositorio = tECB01Repositorio;
        }

        public Response Actualizar(Request<TECB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TECB01Repositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<TECB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TECB01Repositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<TECB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TECB01Repositorio.Insertar(entidad.entidad);
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

        public Response<List<TECB01>> Listar(Request<TECB01> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TECB01>> ListarPaginado(Request<TECB01> entidad)
        {
            Response<List<TECB01>> retorno = new Response<List<TECB01>>();

            try
            {
                DataTable dt = TECB01Repositorio.ListarPaginado(entidad.entidad);
                List<TECB01> lista = new List<TECB01>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new TECB01()
                    {
                        TecCCOD = Util.CapturaString(row, "TecCCOD"),
                        TecDdes = Util.CapturaString(row, "TecDdes"),
                        TecDMne = Util.CapturaString(row, "TecDMne"),
                        TecNewSis = Util.CapturaString(row, "TecNewSis"),
                        ESTADO = Util.CapturaString(row, "TecSest"),
                        FechaReg = Util.CapturaDatetime(row, "TecFLog"),
                        USUARIO_REG = Util.CapturaString(row, "TecULog"),
                        HOST_REG = Util.CapturaString(row, "TecWLog"),
                        FECHA_ACT = Util.CapturaDatetime(row, "TecFMod"),
                        USUARIO_ACT = Util.CapturaString(row, "TecUMod"),
                        HOST_ACT = Util.CapturaString(row, "TecWMod"),

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
