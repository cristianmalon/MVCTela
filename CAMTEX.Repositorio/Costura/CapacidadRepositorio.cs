using CAMTEX.Entidades;
using CAMTEX.UtilData;
using System;
using System.Collections.Generic;
using System.Data;

namespace CAMTEX.Repositorio
{
    public class CapacidadRepositorio : DDataAccess, IGeneralRepositorio<ENCapacidad>
    {
        public IDictionary<string, object> Actualizar(ENCapacidad entidad)
        {
            Dictionary<string, object> retorno = new Dictionary<string, object>();

            oConn.AddParameter("@IdCapacidad", entidad.IdCapacidad);
            oConn.AddParameter("@Horas", entidad.Horas);
            oConn.AddParameter("@Minutos", entidad.Minutos);
            oConn.AddParameter("@PersonalLinea", entidad.PersonalLinea);
            oConn.AddParameter("@EficienciaLinea", entidad.EficienciaLinea);
            oConn.AddParameter("@Cuota", entidad.Cuota);
            oConn.AddParameter("@Capacidad", entidad.Capacidad);
            oConn.AddParameter("@Usuario", entidad.USUARIO_REG);
            oConn.AddParameter("@MaquinaPC", entidad.HOST_REG);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_Capacidad]");

            retorno.Add("resultado", true);
            retorno.Add("mensaje", "OK");
            return retorno;
        }

        public IDictionary<string, object> Eliminar(ENCapacidad entidad)
        {
            throw new NotImplementedException();
        }

        public IDictionary<string, object> Insertar(ENCapacidad entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable Listar(ENCapacidad entidad)
        {
            throw new NotImplementedException();
        }

        public DataTable ListarPaginado(ENCapacidad entidad)
        {
            oConn.AddParameter("@opcion", 1);
            DataTable dt = oConn.ExecuteDataTable("[DBO].[Usp_CapacidadListar]");
            return dt;
        }
    }

}

