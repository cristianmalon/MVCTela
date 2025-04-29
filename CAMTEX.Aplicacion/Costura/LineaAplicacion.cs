using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class LineaAplicacion : IGeneralAplicacion<ENLinea>
    {
        private LineaRepositorio LineaRepositorio;
        public LineaAplicacion(LineaRepositorio LineaRepositorio)
        {
            this.LineaRepositorio = LineaRepositorio;
        }
        public Response Actualizar(Request<ENLinea> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = LineaRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENLinea> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = LineaRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENLinea> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = LineaRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENLinea>> Listar(Request<ENLinea> entidad)
        {
            Response<List<ENLinea>> retorno = new Response<List<ENLinea>>();

            try
            {
                DataTable dt = LineaRepositorio.Listar(entidad.entidad);
                List<ENLinea> lista = new List<ENLinea>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENLinea()
                    {
                        IdLinea = Util.CapturaInt0(row, "IdLinea"),
                        IdUbicacion = Util.CapturaInt0(row, "IdUbicacion"),
                        Linea = Util.CapturaString(row, "Linea"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),
                        LinCCod = Util.CapturaString(row, "LinCCod"),

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
        public Response<List<ENLinea>> ListarActivos(Request<ENLinea> entidad)
        {
            Response<List<ENLinea>> retorno = new Response<List<ENLinea>>();

            try
            {
                DataTable dt = LineaRepositorio.ListarActivos(entidad.entidad);
                List<ENLinea> lista = new List<ENLinea>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENLinea()
                    {
                        IdLinea = Util.CapturaInt0(row, "IdLinea"),
                        IdUbicacion = Util.CapturaInt0(row, "IdUbicacion"),
                        Linea = Util.CapturaString(row, "Linea"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        Supervisor = Util.CapturaString(row, "Supervisor"),
                        Habilitador = Util.CapturaString(row, "Habilitador"),
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
        public Response<List<ENLinea>> ListarActivosFromCamtex(Request<ENLinea> entidad)
        {
            Response<List<ENLinea>> retorno = new Response<List<ENLinea>>();

            try
            {
                DataTable dt = LineaRepositorio.ListarActivosFromCamtex(entidad.entidad);
                List<ENLinea> lista = new List<ENLinea>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENLinea()
                    {
                        IdLinea= Util.CapturaInt0(row, "IdLinea"),
                        Linea = Util.CapturaString(row, "Linea"),
                        LineaCod = Util.CapturaString(row, "LineaCod"),
                        ProveedorCod = Util.CapturaString(row, "ProveedorCod"),
                        Proveedor = Util.CapturaString(row, "Proveedor"),
                        IdProveedor = Util.CapturaInt0(row, "IdProveedor"),
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
        public Response<List<ENProveedor>> ListarProveedorActivosFromCamtex(Request<ENProveedor> entidad)
        {
            Response<List<ENProveedor>> retorno = new Response<List<ENProveedor>>();

            try
            {
                DataTable dt = LineaRepositorio.ListarProveedorActivosFromCamtex(entidad.entidad);
                List<ENProveedor> lista = new List<ENProveedor>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENProveedor()
                    {
                        IdProveedor= Util.CapturaInt0(row, "IdProveedor"),
                        Proveedor = Util.CapturaString(row, "Proveedor"),
                        ProveedorCod = Util.CapturaString(row, "ProveedorCod"),
                        PlantaServicio = Util.CapturaInt0(row, "PlantaServicio"),
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
        public Response<List<ENLinea>> ListarActivosFromCamtexPrvCamtex(Request<ENLinea> entidad)
        {
            Response<List<ENLinea>> retorno = new Response<List<ENLinea>>();

            try
            {
                DataTable dt = LineaRepositorio.ListarActivosFromCamtexPrvCamtex(entidad.entidad);
                List<ENLinea> lista = new List<ENLinea>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENLinea()
                    {
                        IdLinea = Util.CapturaInt0(row, "IdLinea"),
                        Linea = Util.CapturaString(row, "Linea"),
                        LineaCod = Util.CapturaString(row, "LineaCod"),
                        ProveedorCod = Util.CapturaString(row, "ProveedorCod"),
                        Proveedor = Util.CapturaString(row, "Proveedor"),
                        IdProveedor = Util.CapturaInt0(row, "IdProveedor"),
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
        
        public Response<List<ENLinea>> ListarPaginado(Request<ENLinea> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
