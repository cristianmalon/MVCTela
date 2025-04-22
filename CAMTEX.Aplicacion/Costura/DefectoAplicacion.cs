using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class DefectoAplicacion : IGeneralAplicacion<ENDefecto>
    {
        private DefectoRepositorio DefectoRepositorio;
        public DefectoAplicacion(DefectoRepositorio DefectoRepositorio)
        {
            this.DefectoRepositorio = DefectoRepositorio;
        }
        public Response Actualizar(Request<ENDefecto> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = DefectoRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENDefecto> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = DefectoRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENDefecto> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = DefectoRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENDefecto>> Listar(Request<ENDefecto> entidad)
        {
            Response<List<ENDefecto>> retorno = new Response<List<ENDefecto>>();

            try
            {
                DataTable dt = DefectoRepositorio.Listar(entidad.entidad);
                List<ENDefecto> lista = new List<ENDefecto>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENDefecto()
                    {
                        IdDefecto = Util.CapturaInt0(row, "IdDefecto"),
                        Defecto = Util.CapturaString(row, "Defecto"),
                        IdTipoDefecto = Util.CapturaInt0(row, "IdTipoDefecto"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),
                        Codigo= Util.CapturaString(row, "Codigo"),
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

        public Response<List<ENDefecto>> ListarPaginado(Request<ENDefecto> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
