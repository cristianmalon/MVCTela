using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class DefectoResponsableAplicacion : IGeneralAplicacion<ENDefectoResponsable>
    {
        private DefectoResponsableRepositorio DefectoResponsableRepositorio;
        public DefectoResponsableAplicacion(DefectoResponsableRepositorio DefectoResponsableRepositorio)
        {
            this.DefectoResponsableRepositorio = DefectoResponsableRepositorio;
        }
        public Response Actualizar(Request<ENDefectoResponsable> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = DefectoResponsableRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENDefectoResponsable> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = DefectoResponsableRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENDefectoResponsable> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = DefectoResponsableRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENDefectoResponsable>> Listar(Request<ENDefectoResponsable> entidad)
        {
            Response<List<ENDefectoResponsable>> retorno = new Response<List<ENDefectoResponsable>>();

            try
            {
                DataTable dt = DefectoResponsableRepositorio.Listar(entidad.entidad);
                List<ENDefectoResponsable> lista = new List<ENDefectoResponsable>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENDefectoResponsable()
                    {
                        IdDefectoResponsable = Util.CapturaInt0(row, "IdDefectoResponsable"),
                        IdDefecto = Util.CapturaInt0(row, "IdDefecto"),
                        IdResponsableDefecto = Util.CapturaInt0(row, "IdResponsableDefecto"),

                        Codigo = Util.CapturaString(row, "Codigo"),
                        CodigoDefecto = Util.CapturaString(row, "CodigoDefecto"),
                        CodigoResponsable = Util.CapturaString(row, "CodigoResponsable"),

                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),
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
        public Response<List<ENDefectoResponsable>> ListarTodos(Request<ENDefectoResponsable> entidad)
        {
            Response<List<ENDefectoResponsable>> retorno = new Response<List<ENDefectoResponsable>>();

            try
            {
                DataTable dt = DefectoResponsableRepositorio.ListarTodos(entidad.entidad);
                List<ENDefectoResponsable> lista = new List<ENDefectoResponsable>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENDefectoResponsable()
                    {
                        CodigoDefecto = Util.CapturaString(row, "CodigoDefecto"),
                        IdDefecto = Util.CapturaInt0(row, "IdDefecto"),
                        CodigoTipoDefecto = Util.CapturaString(row, "CodigoDefecto"),
                        IdResponsableDefecto = Util.CapturaInt0(row, "IdResponsable"),
                        CodigoResponsable = Util.CapturaString(row, "CodigoResponsable"),
                        IdEstado = Util.CapturaInt0(row, "Estado"),
                        IdDefectoResponsable = Util.CapturaInt0(row, "IdDefectoResponsable"),





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
        public Response<List<ENDefectoResponsable>> ListarPaginado(Request<ENDefectoResponsable> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
