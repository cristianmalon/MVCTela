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
    public class ConfigParametrosAplicacion : IGeneralAplicacion<ConfigParametros>
    {
        private ConfigParametrosRepositorio ConfigParametrosRepositorio;

        public ConfigParametrosAplicacion(ConfigParametrosRepositorio ConfigParametrosRepositorio)
        {
            this.ConfigParametrosRepositorio = ConfigParametrosRepositorio;
        }

        public Response Actualizar(Request<ConfigParametros> entidad)
        {
            throw new NotImplementedException();
        }
        public Response ActualizarRango(Request<ParametroMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ConfigParametrosRepositorio.ActualizarRangos(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["MOTId"].ToString();
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response PreActualizarRangosMasivo(Request<ParametroMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ConfigParametrosRepositorio.PreActualizarRangosMasivo(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["MOTId"].ToString();
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }



        public Response CopiarConfiguracion(Request<ParametroMaquina> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ConfigParametrosRepositorio.CopiarConfiguracion(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["MOTId"].ToString();
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response Eliminar(Request<ConfigParametros> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<ConfigParametros> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ConfigParametrosRepositorio.Insertar(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["MOTId"].ToString();
                retorno.error = false;
                retorno.Success = true;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }
        public Response<List<ConfigParametros>> Listar(Request<ConfigParametros> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<Parametro>> ListarParametros(Request<Parametro> entidad)
        {
            Response<List<Parametro>> retorno = new Response<List<Parametro>>();
            try
            {
                DataTable dt = ConfigParametrosRepositorio.ListarParametros(entidad.entidad);
                List<Parametro> lista = new List<Parametro>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Parametro()
                    {
                        ParametroId = Convert.ToInt32(row["ParametroID"].ToString()),
                        Descripcion = row["Descripcion"] != DBNull.Value ? row["Descripcion"].ToString() : string.Empty,
                        Codigo = row["Codigo"] != DBNull.Value ? row["Codigo"].ToString() : string.Empty,

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
        public Response<List<ParametroMaquina>> ListarParametroMaquina(Request<ConfigParametros> entidad)
        {
            Response<List<ParametroMaquina>> retorno = new Response<List<ParametroMaquina>>();
            try
            {
                DataTable dt = ConfigParametrosRepositorio.ListarParametroMaquina(entidad.entidad);
                List<ParametroMaquina> lista = new List<ParametroMaquina>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ParametroMaquina()
                    {
                        Maquina = row["MaqCCod"] != DBNull.Value ? row["MaqCCod"].ToString() : string.Empty,
                        ParametroId = Convert.ToInt32(row["ParametroID"].ToString()),
                        UnidadMedidaId = Convert.ToInt32(row["UnidadMedidaId"].ToString()),
                        TipoCuerdaID = Convert.ToInt32(row["TipoCuerdaID"].ToString()),

                        ProcesoCodigo = row["ProcesoCodigo"] != DBNull.Value ? row["ProcesoCodigo"].ToString() : string.Empty,

                        TipoTenidoCodigo = row["TipoTenidoCodigo"] != DBNull.Value ? row["TipoTenidoCodigo"].ToString() : string.Empty,
                        Marcado = Convert.ToInt32(row["Marcado"].ToString()),
                        Obligatorio = Convert.ToInt32(row["Obligatorio"].ToString()),
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
        public Response<List<ParametroMaquina>> ListarParametroMaquinaForRango(Request<ConfigParametros> entidad)
        {
            Response<List<ParametroMaquina>> retorno = new Response<List<ParametroMaquina>>();
            try
            {
                DataTable dt = ConfigParametrosRepositorio.ListarParametroMaquinaForRango(entidad.entidad);
                List<ParametroMaquina> lista = new List<ParametroMaquina>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new ParametroMaquina()
                    {
                        TipoTenidoCodigo = row["TipoTenidoCodigo"] != DBNull.Value ? row["TipoTenidoCodigo"].ToString() : string.Empty,

                        ProcesoCodigo = row["ProcesoCodigo"] != DBNull.Value ? row["ProcesoCodigo"].ToString() : string.Empty,
                        Orden = Convert.ToInt32(row["Orden"].ToString()),
                        ParametroId = Convert.ToInt32(row["ParametroID"].ToString()),

                        TipoTenido = row["TipoTeñido"] != DBNull.Value ? row["TipoTeñido"].ToString() : string.Empty,
                        Proceso = row["Proceso"] != DBNull.Value ? row["Proceso"].ToString() : string.Empty,
                        Parametro = row["Parametro"] != DBNull.Value ? row["Parametro"].ToString() : string.Empty,
                        UnidadMedida = row["UnidadMedida"] != DBNull.Value ? row["UnidadMedida"].ToString() : string.Empty,
                        Obligatorio = Convert.ToInt32(row["Obligatorio"].ToString()),
                        Rango = Convert.ToInt32(row["Rango"].ToString()),
                        RangoMin = Convert.ToDecimal(row["RangoMin"].ToString()),
                        RangoMax = Convert.ToDecimal(row["RangoMax"].ToString()),
                        IDPRMM02 = Convert.ToInt32(row["IDPRMM02"].ToString()),
                        //Maquina = row["MaqCCod"] != DBNull.Value ? row["MaqCCod"].ToString() : string.Empty,
                        //ParametroId = Convert.ToInt32(row["ParametroID"].ToString()),
                        //UnidadMedidaId = Convert.ToInt32(row["UnidadMedidaId"].ToString()),
                        //TipoCuerdaID = Convert.ToInt32(row["TipoCuerdaID"].ToString()),

                        //ProcesoCodigo = row["ProcesoCodigo"] != DBNull.Value ? row["ProcesoCodigo"].ToString() : string.Empty,

                        //TipoTenidoCodigo = row["TipoTenidoCodigo"] != DBNull.Value ? row["TipoTenidoCodigo"].ToString() : string.Empty,
                        //Marcado = Convert.ToInt32(row["Marcado"].ToString()),
                        //Obligatorio = Convert.ToInt32(row["Obligatorio"].ToString()),
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
        public Response<List<ConfigParametros>> ListarPaginado(Request<ConfigParametros> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
