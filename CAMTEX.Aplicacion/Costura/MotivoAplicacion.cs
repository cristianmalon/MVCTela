using CAMTEX.Aplicacion.Base;
using CAMTEX.Aplicacion.Entidades;
using CAMTEX.Entidades;
using CAMTEX.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Aplicacion
{
    public class MotivoAplicacion : IGeneralAplicacion<ENMotivo>
    {
        private MotivoRepositorio MotivoRepositorio;
        public MotivoAplicacion(MotivoRepositorio MotivoRepositorio)
        {
            this.MotivoRepositorio = MotivoRepositorio;
        }
        public Response Actualizar(Request<ENMotivo> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = MotivoRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENMotivo> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = MotivoRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENMotivo> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = MotivoRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENMotivo>> Listar(Request<ENMotivo> entidad)
        {
            Response<List<ENMotivo>> retorno = new Response<List<ENMotivo>>();

            try
            {
                DataTable dt = MotivoRepositorio.Listar(entidad.entidad);
                List<ENMotivo> lista = new List<ENMotivo>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENMotivo()
                    {
                        IdMotivo = Util.CapturaInt0(row, "IdMotivo"),
                        Motivo = Util.CapturaString(row, "Motivo"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),
                        IdTipoMotivo = Util.CapturaInt0(row, "IdTipoMotivo"),
                        AreaResponsableCod = Util.CapturaString(row, "AreaResponsableCod"),
                        AreaResponsableDes = Util.CapturaString(row, "AreaResponsable"),
                        Mecanico = Util.CapturaInt0(row, "Mecanico"),
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

        public Response<List<ENMotivo>> ListarPaginado(Request<ENMotivo> entidad)
        {
            throw new NotImplementedException();
        }



        public Response<List<ENMotivo>> ListarParada(Request<ENMotivo> entidad)
        {
            Response<List<ENMotivo>> retorno = new Response<List<ENMotivo>>();

            try
            {
                DataTable dt = MotivoRepositorio.ListarParada(entidad.entidad);
                List<ENMotivo> lista = new List<ENMotivo>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENMotivo()
                    {
                        IdMotivo = Util.CapturaInt0(row, "IdMotivo"),
                        Motivo = Util.CapturaString(row, "Motivo"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),
                        AreaResponsableCod = Util.CapturaString(row, "AreaResponsableCod"),
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

        public Response<List<ENAreaResponsable>> ListarAreaResponsable(Request<ENAreaResponsable> entidad)
        {
            Response<List<ENAreaResponsable>> retorno = new Response<List<ENAreaResponsable>>();

            try
            {
                DataTable dt = MotivoRepositorio.ListarAreaResponsable(entidad.entidad);
                List<ENAreaResponsable> lista = new List<ENAreaResponsable>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENAreaResponsable()
                    {
                        AreaResponsable = Util.CapturaString(row, "AreaResponsable"),
                        AreaResponsableCod = Util.CapturaString(row, "CodAreaResponsable"),

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
