using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class DestinoAplicacion : IGeneralAplicacion<ENDestino>
    {
        private DestinoRepositorio DestinoRepositorio;
        public DestinoAplicacion(DestinoRepositorio DestinoRepositorio)
        {
            this.DestinoRepositorio = DestinoRepositorio;
        }
        public Response Actualizar(Request<ENDestino> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = DestinoRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENDestino> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = DestinoRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENDestino> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = DestinoRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENDestino>> Listar(Request<ENDestino> entidad)
        {
            Response<List<ENDestino>> retorno = new Response<List<ENDestino>>();

            try
            {
                DataTable dt = DestinoRepositorio.Listar(entidad.entidad);
                List<ENDestino> lista = new List<ENDestino>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENDestino()
                    {
                        IdDestino = Util.CapturaInt0(row, "IdDestino"),
                        Destino = Util.CapturaString(row, "Destino"),
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

        public Response<List<ENDestino>> ListarPaginado(Request<ENDestino> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
