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
    public class ParametroAplicacion:IGeneralAplicacion<Parametro>
    {
        private ParametroRepositorio ParametroRepositorio;
        public ParametroAplicacion(ParametroRepositorio ParametroRepositorio)
        {
            this.ParametroRepositorio = ParametroRepositorio;
        }

        public Response Actualizar(Request<Parametro> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<Parametro> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<Parametro> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = ParametroRepositorio.Insertar(entidad.entidad);
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

        public Response<List<Parametro>> Listar(Request<Parametro> entidad)
        {
            Response<List<Parametro>> retorno = new Response<List<Parametro>>();

            try
            {
                DataTable dt = ParametroRepositorio.Listar(entidad.entidad);
                List<Parametro> lista = new List<Parametro>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Parametro()
                    {
                        ParametroId = int.Parse(row["ParametroId"].ToString()),
                        //ParametroCodigo = row["ParametroCodigo"] != DBNull.Value ? row["ParametroCodigo"].ToString() : string.Empty,
                        Descripcion = row["Parametro"] != DBNull.Value ? row["Parametro"].ToString() : string.Empty,
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
        public Response<List<Parametro>> ListarParametroByMaquina(Request<Cuerda> entidad)
        {
            Response<List<Parametro>> retorno = new Response<List<Parametro>>();

            try
            {
                DataTable dt = ParametroRepositorio.ListarParametroByMaquina(entidad.entidad);
                List<Parametro> lista = new List<Parametro>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Parametro()
                    {
                        MaqCCod = row["MaqCCod"] != DBNull.Value ? row["MaqCCod"].ToString() : string.Empty,
                        ParametroId = int.Parse(row["ParametroId"].ToString()),
                        ProcesoCodigo = row["ProcesoCodigo"] != DBNull.Value ? row["ProcesoCodigo"].ToString() : string.Empty,
                        TipoTenidoCodigo = row["TipoTenidoCodigo"] != DBNull.Value ? row["TipoTenidoCodigo"].ToString() : string.Empty,
                        Descripcion = row["Parametro"] != DBNull.Value ? row["Parametro"].ToString() : string.Empty,
                        Obligatorio = int.Parse(row["Obligatorio"].ToString()),
                        Rango = int.Parse(row["Rango"].ToString()),
                        RangoMin = decimal.Parse(row["RangoMin"].ToString()),
                        RangoMax = decimal.Parse(row["RangoMax"].ToString()),
                        UnidadMedidaID = int.Parse(row["UnidadMedidaID"].ToString()),
                        UnidadMedida = row["UnidadMedida"] != DBNull.Value ? row["UnidadMedida"].ToString() : string.Empty,
                        TipoCuerdaID = int.Parse(row["TipoCuerdaID"].ToString()),
                        Valor = decimal.Parse(row["Valor"].ToString()),
                        Sticker= row["Sticker"] != DBNull.Value ? row["Sticker"].ToString() : string.Empty,
                        Peso = decimal.Parse(row["Peso"].ToString()),
                        ValidacionID = int.Parse(row["ValidacionID"].ToString()),
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
        public Response<List<Parametro>> ListarPaginado(Request<Parametro> entidad)
        {
            throw new NotImplementedException();
        }
    }
}
