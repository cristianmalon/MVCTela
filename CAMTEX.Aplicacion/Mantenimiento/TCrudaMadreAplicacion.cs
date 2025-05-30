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
    public class TCrudaMadreAplicacion: IGeneralAplicacion<TCrudaMadre>
    {
        private TCrudaMadreRepositorio TcrudaMadreRepositorio;

        public TCrudaMadreAplicacion(TCrudaMadreRepositorio tcrudaMadreRepositorio)
        {
            TcrudaMadreRepositorio = tcrudaMadreRepositorio;
        }

        public Response Actualizar(Request<TCrudaMadre> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<TCrudaMadre> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<TCrudaMadre> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TCrudaMadre>> Listar(Request<TCrudaMadre> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<TCrudaMadre>> ListarPaginado(Request<TCrudaMadre> entidad)
        {
            Response<List<TCrudaMadre>> retorno = new Response<List<TCrudaMadre>>();

            try
            {
                DataTable dt = TcrudaMadreRepositorio.ListarPaginado(entidad.entidad);
                List<TCrudaMadre> lista = new List<TCrudaMadre>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new TCrudaMadre()
                    {
                        TcmCod = Util.CapturaString(row, "TcmCod"),
                        TcmDes = Util.CapturaString(row, "TcmDes"),
                        TcmMne = Util.CapturaString(row, "TcmMne"),
                        TcmDen = Util.CapturaInt0(row, "TcmDen"),
                        TcmAncho = Util.CapturaInt0(row, "TcmAncho"),
                        TcmAlto = Util.CapturaInt0(row, "TcmAlto"),
                        TcmLMalla = Util.CapturaInt0(row, "TcmLMalla"),
                        TcmCurPul = Util.CapturaInt0(row, "TcmCurPul"),
                        TcmColPul = Util.CapturaInt0(row, "TcmColPul"),
                        TcmTitulo = Util.CapturaString(row, "TcmTitulo"),
                        TcmDesg = Util.CapturaString(row, "TcmDesg"),
                        TcmApa = Util.CapturaString(row, "TcmApa"),
                        TcmFicTej = Util.CapturaInt0(row, "TcmFicTej"),
                        TcmTipTej = Util.CapturaString(row, "TcmTipTej"),



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
