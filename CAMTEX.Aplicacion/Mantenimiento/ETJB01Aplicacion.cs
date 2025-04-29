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
    public class ETJB01Aplicacion : IGeneralAplicacion<ETJB01>
    {
        private ETJB01Repositorio ETJB01Repositorio;
        public ETJB01Aplicacion(ETJB01Repositorio ETJB01Repositorio)
        {
            this.ETJB01Repositorio = ETJB01Repositorio;
        }

        public Response Actualizar(Request<ETJB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ETJB01Repositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ETJB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ETJB01Repositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ETJB01> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ETJB01Repositorio.Insertar(entidad.entidad);
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

        public Response<List<ETJB01>> Listar(Request<ETJB01> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<ETJB01>> ListarPaginado(Request<ETJB01> entidad)
        {
            Response<List<ETJB01>> retorno = new Response<List<ETJB01>>();

            try
            {
                DataTable dt = ETJB01Repositorio.ListarPaginado(entidad.entidad);
                List<ETJB01> lista = new List<ETJB01>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ETJB01()
                    {
                        ETJCCOD = Util.CapturaString(row, "ETJCCOD"),
                        ETjDDes = Util.CapturaString(row, "ETjDDes"),
                        ETjDMne = Util.CapturaString(row, "ETjDMne"),
                        ETjSTip = Util.CapturaString(row, "ETjSTip"),
                        ESTADO = Util.CapturaString(row, "EtjSEStado"),
                        EtjID = Util.CapturaInt0(row, "EtjID"),
                        FechaReg = Util.CapturaDatetime(row, "ETjFLogC1"),
                        USUARIO_REG = Util.CapturaString(row, "ETjULogC1"),
                        HOST_REG = Util.CapturaString(row, "ETjWLogC1"),
                        FECHA_ACT = Util.CapturaDatetime(row, "ETjFLogM1"),
                        USUARIO_ACT = Util.CapturaString(row, "ETjULogM1"),
                        HOST_ACT = Util.CapturaString(row, "ETjWLogM1"),

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
