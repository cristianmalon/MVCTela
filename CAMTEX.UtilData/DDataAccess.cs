using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.UtilData
{
    public abstract class  DDataAccess : Desechable
    {
        protected DBAccess oConn;
        public DDataAccess(string strConexion = null)
        {
            oConn = new DBAccess(strConexion);
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
