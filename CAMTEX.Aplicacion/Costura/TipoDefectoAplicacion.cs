using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class TipoDefectoAplicacion : IGeneralAplicacion<ENTipoDefecto>
    {
        private TipoDefectoRepositorio TipoDefectoRepositorio;
        public TipoDefectoAplicacion(TipoDefectoRepositorio TipoDefectoRepositorio)
        {
            this.TipoDefectoRepositorio = TipoDefectoRepositorio;
        }
        public Response Actualizar(Request<ENTipoDefecto> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TipoDefectoRepositorio.Actualizar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response Eliminar(Request<ENTipoDefecto> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TipoDefectoRepositorio.Eliminar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response Insertar(Request<ENTipoDefecto> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TipoDefectoRepositorio.Insertar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["IdTrabajador"].ToString();
                retorno.error = false;

            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<ENTipoDefecto>> Listar(Request<ENTipoDefecto> entidad)
        {
            Response<List<ENTipoDefecto>> retorno = new Response<List<ENTipoDefecto>>();

            try
            {
                DataTable dt = TipoDefectoRepositorio.Listar(entidad.entidad);
                List<ENTipoDefecto> lista = new List<ENTipoDefecto>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENTipoDefecto()
                    {
                        IdTipoDefecto = Util.CapturaInt0(row, "IdTipoDefecto"),
                        TipoDefecto = Util.CapturaString(row, "TipoDefecto"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),
                        Codigo = Util.CapturaString(row, "Codigo"),
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

        public Response<List<ENTipoDefecto>> ListarPaginado(Request<ENTipoDefecto> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
