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
    public class ACQB01Aplicacion: IGeneralAplicacion<ACQB01>
    {
        private ACQB01Repositorio ACQB01Repositorio;

        public ACQB01Aplicacion(ACQB01Repositorio aCQB01Repositorio)
        {
            ACQB01Repositorio = aCQB01Repositorio;
        }

        public Response Actualizar(Request<ACQB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ACQB01Repositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ACQB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ACQB01Repositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ACQB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ACQB01Repositorio.Insertar(entidad.entidad);
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

        public Response<List<ACQB01>> Listar(Request<ACQB01> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ACQB01>> ListarPaginado(Request<ACQB01> entidad)
        {
            Response<List<ACQB01>> retorno = new Response<List<ACQB01>>();

            try
            {
                DataTable dt = ACQB01Repositorio.ListarPaginado(entidad.entidad);
                List<ACQB01> lista = new List<ACQB01>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ACQB01()
                    {
                        AcqCCOD = Util.CapturaString(row, "AcqCCOD"),
                        AcqDdes = Util.CapturaString(row, "AcqDdes"),
                        AcqDMne = Util.CapturaString(row, "AcqDMne"),
                        AcqSclase = Util.CapturaString(row, "AcqSclase"),
                        AcqNewSis = Util.CapturaString(row, "AcqNewSis"),
                        ESTADO = Util.CapturaString(row, "AcqSest"),
                        FechaReg = Util.CapturaDatetime(row, "AcqFLog1"),
                        USUARIO_REG = Util.CapturaString(row, "AcqULog1"),
                        HOST_REG = Util.CapturaString(row, "AcqWLog1"),
                        FECHA_ACT = Util.CapturaDatetime(row, "AcqFMod"),
                        USUARIO_ACT = Util.CapturaString(row, "AcqUMod"),
                        HOST_ACT = Util.CapturaString(row, "AcqWMod"),

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
