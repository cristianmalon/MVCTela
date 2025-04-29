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
    public class SupervisorAplicacion : IGeneralAplicacion<Supervisor>
    {
        private SupervisorRepositorio SupervisorRepositorio;
        public SupervisorAplicacion(SupervisorRepositorio SupervisorRepositorio)
        {
            this.SupervisorRepositorio = SupervisorRepositorio;
        }

        public Response Actualizar(Request<Supervisor> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Eliminar(Request<Supervisor> entidad)
        {
            throw new NotImplementedException();
        }

        public Response Insertar(Request<Supervisor> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<Supervisor>> Listar(Request<Supervisor> entidad)
        {
            Response<List<Supervisor>> retorno = new Response<List<Supervisor>>();

            try
            {
                DataTable dt = SupervisorRepositorio.Listar(entidad.entidad);
                List<Supervisor> lista = new List<Supervisor>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Supervisor()
                    {
                        Codigo = row["EPLCCOD"] != DBNull.Value ? row["EPLCCOD"].ToString() : string.Empty,
                        Descripcion = row["EPLDNOM"] != DBNull.Value ? row["EPLDNOM"].ToString() : string.Empty,
                        Cargo = row["Cargo"] != DBNull.Value ? row["Cargo"].ToString() : string.Empty,
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

        public Response<List<Supervisor>> UsuarioAutoriza(Request<Supervisor> entidad)
        {
            Response<List<Supervisor>> retorno = new Response<List<Supervisor>>();

            try
            {
                DataTable dt = SupervisorRepositorio.Listar(entidad.entidad);
                List<Supervisor> lista = new List<Supervisor>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Supervisor()
                    {
                        Codigo = row["EPLCCOD"] != DBNull.Value ? row["EPLCCOD"].ToString() : string.Empty,
                        Descripcion = row["EPLDNOM"] != DBNull.Value ? row["EPLDNOM"].ToString() : string.Empty,
                        
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
        public Response<List<Supervisor>> ListarPaginado(Request<Supervisor> entidad)
        {
            throw new NotImplementedException();
        }

        public Response<List<Operario>> ListarOperario(Request<Operario> entidad)
        {
            Response<List<Operario>> retorno = new Response<List<Operario>>();

            try
            {
                DataTable dt = SupervisorRepositorio.ListarOperario(entidad.entidad);
                List<Operario> lista = new List<Operario>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Operario()
                    {
                        Codigo = row["EPLCCOD"] != DBNull.Value ? row["EPLCCOD"].ToString() : string.Empty,
                        Descripcion = row["EPLDNOM"] != DBNull.Value ? row["EPLDNOM"].ToString() : string.Empty,
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

        public Response<List<Operario>> ListarAyudante(Request<Operario> entidad)
        {
            Response<List<Operario>> retorno = new Response<List<Operario>>();

            try
            {
                DataTable dt = SupervisorRepositorio.ListarAyudante(entidad.entidad);
                List<Operario> lista = new List<Operario>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Operario()
                    {
                        Codigo = row["EPLCCOD"] != DBNull.Value ? row["EPLCCOD"].ToString() : string.Empty,
                        Descripcion = row["EPLDNOM"] != DBNull.Value ? row["EPLDNOM"].ToString() : string.Empty,
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
        public Response<List<Operario>> ListarUsuario(Request<Operario> entidad)
        {
            Response<List<Operario>> retorno = new Response<List<Operario>>();

            try
            {
                DataTable dt = SupervisorRepositorio.ListarUsuario(entidad.entidad);
                List<Operario> lista = new List<Operario>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Operario()
                    {
                        Codigo = row["EPLCCOD"] != DBNull.Value ? row["EPLCCOD"].ToString() : string.Empty,
                        Descripcion = row["EPLDNOM"] != DBNull.Value ? row["EPLDNOM"].ToString() : string.Empty,
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
        public Response<Operario> ListarUsuarioDatos(Request<Operario> entidad)
        {
            Response<Operario> retorno = new Response<Operario>();

            try
            {
                DataTable dt = SupervisorRepositorio.ListarUsuarioDatos(entidad.entidad);
                Operario o = new Operario();

                foreach (DataRow row in dt.Rows)
                {
                    o = new Operario()
                    {
                        Codigo = row["EPLCCOD"] != DBNull.Value ? row["EPLCCOD"].ToString() : string.Empty,
                        Descripcion = row["EPLDNOM"] != DBNull.Value ? row["EPLDNOM"].ToString() : string.Empty,
                    };
                }

                retorno.error = false;
                retorno.response = o;
            }
            catch (Exception ex)
            {
                retorno.error = true;
                retorno.mensaje = ex.Message;
            }
            return retorno;
        }

        public Response<List<Supervisor>> ListarPersonalMantenimiento(Request<Supervisor> entidad)
        {
            Response<List<Supervisor>> retorno = new Response<List<Supervisor>>();

            try
            {
                DataTable dt = SupervisorRepositorio.ListarPersonalMantenimiento(entidad.entidad);
                List<Supervisor> lista = new List<Supervisor>();

                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Supervisor()
                    {
                        Codigo = row["EPLCCOD"] != DBNull.Value ? row["EPLCCOD"].ToString() : string.Empty,
                        Descripcion = row["EPLDNOM"] != DBNull.Value ? row["EPLDNOM"].ToString() : string.Empty,
                        Cargo = row["Cargo"] != DBNull.Value ? row["Cargo"].ToString() : string.Empty,
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
