using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class ResponsableAplicacion : IGeneralAplicacion<ENResponsable>
    {
        private ResponsableRepositorio ResponsableRepositorio;
        public ResponsableAplicacion(ResponsableRepositorio ResponsableRepositorio)
        {
            this.ResponsableRepositorio = ResponsableRepositorio;
        }
        public Response Actualizar(Request<ENResponsable> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ResponsableRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENResponsable> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ResponsableRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENResponsable> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ResponsableRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENResponsable>> Listar(Request<ENResponsable> entidad)
        {
            Response<List<ENResponsable>> retorno = new Response<List<ENResponsable>>();

            try
            {
                DataTable dt = ResponsableRepositorio.Listar(entidad.entidad);
                List<ENResponsable> lista = new List<ENResponsable>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENResponsable()
                    {
                        IdResponsable = Util.CapturaInt0(row, "IdResponsable"),
                        Responsable = Util.CapturaString(row, "Responsable"),
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

        public Response<List<ENResponsable>> ListarPaginado(Request<ENResponsable> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
