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
    public class TipoMaquinaAplicacion : IGeneralAplicacion<ENTipoMaquina>
    {
        private TipoMaquinaRepositorio TipoMaquinaRepositorio;
        public TipoMaquinaAplicacion(TipoMaquinaRepositorio TipoMaquinaRepositorio)
        {
            this.TipoMaquinaRepositorio = TipoMaquinaRepositorio;
        }

        public Response Actualizar(Request<ENTipoMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TipoMaquinaRepositorio.Actualizar(entidad.entidad);
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

        public Response Eliminar(Request<ENTipoMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TipoMaquinaRepositorio.Eliminar(entidad.entidad);
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

        public Response Insertar(Request<ENTipoMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = TipoMaquinaRepositorio.Insertar(entidad.entidad);
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

        public Response<List<ENTipoMaquina>> Listar(Request<ENTipoMaquina> entidad)
        {
            Response<List<ENTipoMaquina>> retorno = new Response<List<ENTipoMaquina>>();

            try
            {
                DataTable dt = TipoMaquinaRepositorio.Listar(entidad.entidad);
                List<ENTipoMaquina> lista = new List<ENTipoMaquina>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENTipoMaquina()
                    {
                        IdTipoMaquina = Util.CapturaInt0(row, "IdTipoMaquina"),
                        TipoMaquina = Util.CapturaString(row, "TipoMaquina"),
                        USUARIO_REG = Util.CapturaString(row, "UsuarioReg"),
                        FECHA_REG = Util.CapturaDatetime(row, "FechaReg"),
                        ESTADO = Util.CapturaString(row, "Estado"),
                        ESTADO_DES = Util.CapturaString(row, "Estado_Des"),

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

        public Response<List<ENTipoMaquina>> ListarActivo(Request<ENTipoMaquina> entidad)
        {
            Response<List<ENTipoMaquina>> retorno = new Response<List<ENTipoMaquina>>();

            try
            {
                DataTable dt = TipoMaquinaRepositorio.ListarActivo(entidad.entidad);
                List<ENTipoMaquina> lista = new List<ENTipoMaquina>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENTipoMaquina()
                    {
                        IdTmiB02 = Util.CapturaInt0(row, "IdTmiB02"),
                        TipoMaquina = Util.CapturaString(row, "TMIDMaq"),
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

        public Response<List<ENSubtipoMaquina>> Listar_subtipo(Request<ENTipoMaquina> entidad)
        {
            Response<List<ENSubtipoMaquina>> retorno = new Response<List<ENSubtipoMaquina>>();

            try
            {
                DataTable dt = TipoMaquinaRepositorio.Listar_subtipo(entidad.entidad);
                List<ENSubtipoMaquina> lista = new List<ENSubtipoMaquina>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ENSubtipoMaquina()
                    {
                        IdTmiB01 = Util.CapturaInt0(row, "IdTmiB01"),
                        IdTmiB02 = Util.CapturaInt0(row, "IdTmiB02"),
                        TMIDDes = Util.CapturaString(row, "TMIDDes"),
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

        public Response<List<ENTipoMaquina>> ListarPaginado(Request<ENTipoMaquina> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
