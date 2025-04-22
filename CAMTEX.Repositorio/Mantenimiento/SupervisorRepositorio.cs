using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Repositorio
{
    public class SupervisorRepositorio : DDataAccess, IGeneralRepositorio<Supervisor>
    {
        public IDictionary<string, object> Actualizar(Supervisor entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(Supervisor entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(Supervisor entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(Supervisor entidad)
        {
            oConn.AddOutParameter("@Query", 2);
            //oConn.AddOutParameter("@FunCCod", 2);
            oConn.AddOutParameter("@Codigo", entidad.Codigo);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.USP_Supervisor");
            return dt;
        }
        public DataTable UsuarioAutoriza(Supervisor entidad)
        {
            oConn.AddOutParameter("@Query", 2);
            //oConn.AddOutParameter("@FunCCod", 2);
            //oConn.AddOutParameter("@Codigo", 2);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.USP_Supervisor");
            return dt;
        }
        public DataTable ListarPaginado(Supervisor entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarOperario(Operario entidad)
        {
            oConn.AddOutParameter("@Query", 1);
            //oConn.AddOutParameter("@FunCCod", 2);
            oConn.AddOutParameter("@Codigo", entidad.Codigo);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_Operario]");
            return dt;
        }
        public DataTable ListarAyudante(Operario entidad)
        {
            oConn.AddOutParameter("@Query", 2);
            //oConn.AddOutParameter("@FunCCod", 2);
            oConn.AddOutParameter("@Codigo", entidad.Codigo);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_Operario]");
            return dt;
        }

        public DataTable ListarUsuario(Operario entidad)
        {
            oConn.AddOutParameter("@Query", 3);
            oConn.AddOutParameter("@TipoUsuario", entidad.TipoUsuario);
            oConn.AddOutParameter("@Codigo", entidad.Codigo);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_Operario]");
            return dt;
        }

        public DataTable ListarUsuarioDatos(Operario entidad)
        {
            oConn.AddOutParameter("@Query", 4);
            oConn.AddOutParameter("@Codigo", entidad.Codigo);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_Operario]");
            return dt;
        }

        public DataTable ListarPersonalMantenimiento(Supervisor entidad)
        {
            oConn.AddOutParameter("@Query", 4);
            oConn.AddOutParameter("@Codigo", entidad.Codigo);
            DataTable dt = oConn.ExecuteDataTable("DBSEG02.Tinto.[USP_Supervisor]");
            return dt;
        }
    }
}
