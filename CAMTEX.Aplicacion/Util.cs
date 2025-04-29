using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Aplicacion.Base
{
    public class Util
    {
        public static int CapturaInt0(DataRow row, string campo)
        {
            return row[campo] != DBNull.Value ? int.Parse(row[campo].ToString()) : 0;
        }

        public static decimal CapturaDecimal(DataRow row, string campo)
        {
            return row[campo] != DBNull.Value ? decimal.Parse(row[campo].ToString()) : (decimal)0;
        }

        public static int? CapturaIntNull(DataRow row, string campo)
        {
            return row[campo] != DBNull.Value ? int.Parse(row[campo].ToString()) : (int?)null;
        }

        public static string CapturaString(DataRow row, string campo)
        {
            return row[campo] != DBNull.Value ? row[campo].ToString() : string.Empty;
        }

        public static DateTime? CapturaDatetime(DataRow row, string campo)
        {
            return row[campo].ToString() == string.Empty ? (DateTime?)null : Convert.ToDateTime(row[campo].ToString());
        }

        public static bool CapturaIntToBool(DataRow row, string campo)
        {
            return row[campo].ToString() == string.Empty ? false : (row[campo].ToString() == "0" ? false : true);
        }

        public static byte[] CapturaVarBinary(DataRow row, string campo)
        {
            return row[campo].ToString() == string.Empty ? (byte[])null : (byte[])row[campo];
        }
        public static string CapturaVarBinaryToBase64(DataRow row, string campo)
        {
            var stringBase64 = "";
            var bytArr =  row[campo].ToString() == string.Empty ? (byte[])null : (byte[])row[campo];
            if (bytArr != null && bytArr.Length > 1) {
                stringBase64 = Convert.ToBase64String(bytArr, 0, bytArr.Length);
            }
            return stringBase64;
        }
        //row["OPC_FECHA_EMISION"].ToString() == string.Empty ? (DateTime?)null : Convert.ToDateTime(row["OPC_FECHA_EMISION"].ToString()),
    }
}
