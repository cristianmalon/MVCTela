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
    public class CuerdaRepositorio : DDataAccess, IGeneralRepositorio<Cuerda>
    {
        public IDictionary<string, object> Actualizar(Cuerda entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Eliminar(Cuerda entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(Cuerda entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(Cuerda entidad)
        {
            oConn.AddParameter("@Query", 1);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@OFaCTDc", entidad.OFaCTDc);
            oConn.AddParameter("@OFaNAno", entidad.OFaNAno);
            oConn.AddParameter("@OFaNNro", entidad.OFaNNro);

            DataTable dt = oConn.ExecuteDataTable("dbseg02.[Tinto].[USP_Cuerdas]");
            return dt;
            
        }

        public DataTable ListarPaginado(Cuerda entidad)
        {
            throw new NotImplementedException();
        }


        public DataTable ListarDatosOF(Cuerda entidad)
        {
            oConn.AddParameter("@Query", 2);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@OFaCTDc", entidad.OFaCTDc);
            oConn.AddParameter("@OFaNAno", entidad.OFaNAno);
            oConn.AddParameter("@OFaNNro", entidad.OFaNNro);

            DataTable dt = oConn.ExecuteDataTable("dbseg02.[Tinto].[USP_Cuerdas]");
            return dt;

        }
        public DataTable OFAbierta(Cuerda entidad)
        {
            oConn.AddParameter("@Query", 4);
            oConn.AddParameter("@EmpCCod", entidad.EmpCCod);
            oConn.AddParameter("@OFaCTDc", entidad.OFaCTDc);
            oConn.AddParameter("@OFaNAno", entidad.OFaNAno);
            oConn.AddParameter("@OFaNNro", entidad.OFaNNro);
            oConn.AddParameter("@Maquina", entidad.MaqCCod);
            

            DataTable dt = oConn.ExecuteDataTable("dbseg02.[Tinto].[USP_Cuerdas]");
            return dt;

        }
    }
}
