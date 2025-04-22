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
    public class RegProdAplicacion:IGeneralAplicacion<RegProd>
    {
        private RegProdRepositorio RegProdRepositorio;

        public RegProdAplicacion(RegProdRepositorio RegProdRepositorio)
        {
            this.RegProdRepositorio = RegProdRepositorio;
        }

        public Response Actualizar(Request<RegProd> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = RegProdRepositorio.Actualizar(entidad.entidad);
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
        public Response ActualizarParametros(Request<RegProd> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = RegProdRepositorio.ActualizarParametros(entidad.entidad);
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

        public Response Eliminar(Request<RegProd> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<RegProd> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = RegProdRepositorio.Insertar(entidad.entidad);
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
        public Response InsertarRegulariza(Request<RegProd> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = RegProdRepositorio.InsertarRegulariza(entidad.entidad);
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
        public Response InsertarParada(Request<RegProd> entidad)
        {
            Response retorno = new Response();
            try
            {
                var resultado = RegProdRepositorio.InsertarParada(entidad.entidad);
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

        public Response<List<RegProd>> InsertarOFPrevio(Request<RegProd> entidad)
        {
            //Response retorno = new Response();
            Response<List<RegProd>> retorno = new Response<List<RegProd>>();
            try
            {
                var resultado = RegProdRepositorio.InsertarOFPrevio(entidad.entidad);
                retorno.Success = true;
                //retorno.output = resultado["MOTId"].ToString();
                retorno.error = false;
                retorno.Success = true;

                List<RegProd> lista = new List<RegProd>();
                foreach (DataRow row in resultado.Rows)
                {
                    lista.Add(new RegProd()
                    {
                        OFaCTDcPP = row["OFaCTDcPP"] != DBNull.Value ? row["OFaCTDcPP"].ToString() : string.Empty,
                        OFaNAnoPP = row["OFaNAnoPP"] != DBNull.Value ? row["OFaNAnoPP"].ToString() : string.Empty,
                        OFaNNroPP = row["OFaNNroPP"] != DBNull.Value ? row["OFaNNroPP"].ToString() : string.Empty,
                        
                    });
                }
                retorno.response = lista;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<RegProd>> Listar(Request<RegProd> entidad)
        {
            Response<List<RegProd>> retorno = new Response<List<RegProd>>();

            try
            {
                DataTable dt = RegProdRepositorio.Listar(entidad.entidad);
                List<RegProd> lista = new List<RegProd>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new RegProd()
                    {
                        FechaInicio = row["FechaInicio"].ToString(),

                        CodSupervisor = row["CodSupervisor"] != DBNull.Value ? row["CodSupervisor"].ToString() : string.Empty,
                        Supervisor = row["Supervisor"] != DBNull.Value ? row["Supervisor"].ToString() : string.Empty,
                        CodOperario = row["CodOperario"] != DBNull.Value ? row["CodOperario"].ToString() : string.Empty,
                        Operario = row["Operario"] != DBNull.Value ? row["Operario"].ToString() : string.Empty,

                        CodAyudante = row["CodAyudante"] != DBNull.Value ? row["CodAyudante"].ToString() : string.Empty,
                        Ayudante = row["Ayudante"] != DBNull.Value ? row["Ayudante"].ToString() : string.Empty,


                        Maquina = row["Maquina"] != DBNull.Value ? row["Maquina"].ToString() : string.Empty,
                        NombreMaquina = row["NombreMaquina"] != DBNull.Value ? row["NombreMaquina"].ToString() : string.Empty,

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

        public Response ListarData(Request<RegProd> entidad)
        {
            //Response<List<RegProd>> retorno = new Response<List<RegProd>>();
            Response retorno = new Response();

            try
            {
                DataTable dt = RegProdRepositorio.ListarData(entidad.entidad);
                List<RegProd> lista = new List<RegProd>();

                //foreach (DataRow row in dt.Rows)
                //{
                //    lista.Add(new RegProd()
                //    {
                //        FechaInicio = row["FechaInicio"].ToString(),

                //        CodSupervisor = row["CodSupervisor"] != DBNull.Value ? row["CodSupervisor"].ToString() : string.Empty,
                //        Supervisor = row["Supervisor"] != DBNull.Value ? row["Supervisor"].ToString() : string.Empty,
                //        CodOperario = row["CodOperario"] != DBNull.Value ? row["CodOperario"].ToString() : string.Empty,
                //        Operario = row["Operario"] != DBNull.Value ? row["Operario"].ToString() : string.Empty,
                //        Maquina = row["Maquina"] != DBNull.Value ? row["Maquina"].ToString() : string.Empty,
                //        NombreMaquina = row["NombreMaquina"] != DBNull.Value ? row["NombreMaquina"].ToString() : string.Empty,

                //    });
                //}

                //retorno.error = false;
                //retorno.response = lista;
                retorno.tabla = dt;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<RegProd>> ListarParada(Request<RegProd> entidad)
        {
            Response<List<RegProd>> retorno = new Response<List<RegProd>>();

            try
            {
                DataTable dt = RegProdRepositorio.ListarParada(entidad.entidad);
                List<RegProd> lista = new List<RegProd>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new RegProd()
                    {
                        FechaInicio =  row["FechaInicio"].ToString(),
                      
                        CodSupervisor = row["CodSupervisor"] != DBNull.Value ? row["CodSupervisor"].ToString() : string.Empty,
                        Supervisor = row["Supervisor"] != DBNull.Value ? row["Supervisor"].ToString() : string.Empty,
                        CodOperario = row["CodOperario"] != DBNull.Value ? row["CodOperario"].ToString() : string.Empty,
                        Operario = row["Operario"] != DBNull.Value ? row["Operario"].ToString() : string.Empty,
                        Maquina = row["Maquina"] != DBNull.Value ? row["Maquina"].ToString() : string.Empty,
                        NombreMaquina = row["NombreMaquina"] != DBNull.Value ? row["NombreMaquina"].ToString() : string.Empty,


                        MotivoParadaCod = row["MotivoParadaCod"] != DBNull.Value ? row["MotivoParadaCod"].ToString() : string.Empty,
                        MotivoParada = row["MotivoParada"] != DBNull.Value ? row["MotivoParada"].ToString() : string.Empty,
                        MotivoEspecificoParadaCod = row["MotivoEspecificoParadaCod"] != DBNull.Value ? row["MotivoEspecificoParadaCod"].ToString() : string.Empty,
                        MotivoEspecificoParada = row["MotivoEspecificoParada"] != DBNull.Value ? row["MotivoEspecificoParada"].ToString() : string.Empty,

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
        
        public Response<List<RegProd>> ListarPaginado(Request<RegProd> entidad)
        {
            throw new NotImplementedException();

        }
    }
}
