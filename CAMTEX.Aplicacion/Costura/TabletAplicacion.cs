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
    public class TabletAplicacion : IGeneralAplicacion<ENTablet>
    {
        private TabletRepositorio TabletRepositorio;
        public TabletAplicacion(TabletRepositorio TabletRepositorio)
        {
            this.TabletRepositorio = TabletRepositorio;
        }

        public Response Actualizar(Request<ENTablet> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TabletRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENTablet> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TabletRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENTablet> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TabletRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENTablet>> Listar(Request<ENTablet> entidad)
        {
            Response<List<ENTablet>> retorno = new Response<List<ENTablet>>();

            try
            {
                DataTable dt = TabletRepositorio.Listar(entidad.entidad);
                List<ENTablet> lista = new List<ENTablet>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENTablet()
                    {
                        IdTipoMaquina = Util.CapturaInt0(row, "IdTipoMaquina"),
                        IdTablet = Util.CapturaInt0(row, "IdTablet"),
                        TipoMaquina = Util.CapturaString(row, "TipoMaquina"),
                        IPTablet = Util.CapturaString(row, "IPTablet"),
                        IdMaquina = Util.CapturaInt0(row, "IdPmqB01"),
                        Maquina = Util.CapturaString(row, "Maquina"),
                        TMICCod = Util.CapturaString(row, "TMICCod"),
                        IdParada = Util.CapturaInt0(row, "IdRpmD01"),
                        Linea = Util.CapturaString(row, "LinDDes"),
                        RpmCTipFalla = Util.CapturaString(row, "RpmCTipFalla"),
                        IdLinea = Util.CapturaInt0(row, "IdLinea"),
                        Supervisor = Util.CapturaString(row, "Supervisor"),
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

        public Response<List<ENTablet>> ListarPaginado(Request<ENTablet> entidad)
        {
            Response<List<ENTablet>> retorno = new Response<List<ENTablet>>();

            try
            {
                DataTable dt = TabletRepositorio.ListarPaginado(entidad.entidad);
                List<ENTablet> lista = new List<ENTablet>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENTablet()
                    {
                        IdTablet = Util.CapturaInt0(row, "IdTablet"),
                        Descripcion = Util.CapturaString(row, "Descripcion"),
                        CodigoSap = Util.CapturaString(row, "CodigoSap"),
                        Marca = Util.CapturaString(row, "Marca"),
                        Modelo = Util.CapturaString(row, "Modelo"),
                        Serie = Util.CapturaString(row, "Serie"),
                        IdEstado = Util.CapturaInt0(row, "Estado"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        IPTablet = Util.CapturaString(row, "IPTablet"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),
                        IdMaquina = Util.CapturaInt0(row, "IdPmqB01"),
                        Maquina = Util.CapturaString(row, "Maquina"),
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
