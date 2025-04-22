using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.UtilData
{
    public abstract  class DData : Desechable
    {
        /// <summary>
        /// Conexion activa de acuerdo a las credenciales del usuario actual
        /// </summary>
        protected Conexion oConn;

        private string dbUsuario;
        private string dbPass;
        private string dbServer;

        public DData()
        {
            this.dbUsuario = ConfigurationManager.AppSettings["dbUsuario"];
            this.dbPass = ConfigurationManager.AppSettings["dbPass"];
            this.dbServer = ConfigurationManager.AppSettings["dbBD"];

            oConn = new Conexion(this.dbUsuario, this.dbPass, this.dbServer);
        }

        protected override void DisposeTime()
        {
            oConn.Dispose();
        }

        protected override void FinalizeTime()
        {
            oConn = null;
        }
    }
}
