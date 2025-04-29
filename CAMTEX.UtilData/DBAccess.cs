using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.UtilData
{

    public  class DBAccess
    {
        private string dbUsuario;
        private string dbPass;
        private string dbServer;
        private string ServerName;

        private IDbCommand cmd = new SqlCommand();
        SqlConnection conexion = new SqlConnection();
        private bool handleErrors = false;
        private string strLastError = "";
        private string CadenaConexion = string.Empty;
        private string xmlVersion = string.Empty;
        /// <summary>
        /// 
        /// </summary>
        public DBAccess(string strCadenaConexion = null)
        {
            this.dbUsuario = ConfigurationManager.AppSettings["dbUsuario"];
            this.dbPass = ConfigurationManager.AppSettings["dbPass"];
            this.dbServer = ConfigurationManager.AppSettings["dbBD"];
            this.ServerName = ConfigurationManager.AppSettings["DBSERVER"];

            if (!string.IsNullOrEmpty(strCadenaConexion))
            {
                conexion = new SqlConnection(strCadenaConexion);
            }
            else
            {
                string sConexion = string.Format("data source={0};initial catalog ={1};user id={2};password={3};",this.ServerName, this.dbServer, this.dbUsuario, this.dbPass);
                conexion = new SqlConnection(sConexion);
            }
            
            cmd.Connection = conexion;
            cmd.CommandTimeout = 18000;
            cmd.CommandType = CommandType.StoredProcedure;
        }
        public SqlConnection ReturnCNX()
        {
            return conexion;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IDataReader ExecuteDataReader()
        {
            IDataReader reader = null;
            try
            {
                this.Open();
                reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }
            catch (Exception)
            {
                throw;
            }
            return reader;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CommandText"></param>
        /// <returns></returns>
        public IDataReader ExecuteDataReader(string CommandText)
        {
            IDataReader reader = null;
            try
            {
                cmd.CommandText = CommandText;
                reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }
            catch (Exception)
            {
                throw;
            }
            return reader;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public object ExecuteScalar()
        {
            object obj = null;
            try
            {
                this.Open();
                obj = cmd.ExecuteScalar();
                this.Close();
            }
            catch (Exception)
            {

                throw;
            }
            return obj;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CommandText"></param>
        /// <returns></returns>
        public object ExecuteScalar(string CommandText)
        {
            object obj = null;
            try
            {
                this.Open();
                cmd.CommandText = CommandText;
                obj = cmd.ExecuteScalar();
                this.Close();
            }
            catch (Exception)
            {

                throw;
            }
            return obj;
        }

        public int ExecuteNonQuery()
        {
            int i = -1;
            try
            {
                this.Open();
                i = cmd.ExecuteNonQuery();
                this.Close();
            }

            catch (Exception)
            {
                throw;
            }

            return i;
        }

        public int ExecuteNonQuery(string commandtext)
        {
            int i = -1;
            try
            {
                cmd.CommandText = commandtext;
                i = this.ExecuteNonQuery();
            }

            catch (Exception)
            {
                throw;
            }

            return i;
        }

        public int ExecuteNonQueryTextQuery(string commandtext)
        {
            int i = -1;
            try
            {
                cmd.CommandText = commandtext;
                cmd.CommandType = CommandType.Text;
                i = this.ExecuteNonQuery();
            }

            catch (Exception)
            {
                throw;
            }

            return i;
        }

        public DataSet ExecuteDataSet()
        {
            SqlDataAdapter da = null;
            DataSet ds = null;
            try
            {
                da = new SqlDataAdapter();
                da.SelectCommand = (SqlCommand)cmd;
                ds = new DataSet();
                da.Fill(ds);
            }
            catch (Exception)
            {
                throw;
            }

            return ds;
        }

        public DataSet ExecuteDataSet(string commandtext)
        {
            DataSet ds = null;
            try
            {
                cmd.CommandText = commandtext;
                ds = this.ExecuteDataSet();
            }

            catch
            {
                throw;
            }

            return ds;
        }

        public DataTable ExecuteDataTable()
        {
            SqlDataAdapter da = null;
            DataTable ds = null;
            try
            {
                da = new SqlDataAdapter();
                da.SelectCommand = (SqlCommand)cmd;
                ds = new DataTable();
                da.Fill(ds);
            }
            catch (Exception ex)
            {
                throw;
            }

            return ds;
        }

        public DataTable ExecuteDataTable(string commandtext)
        {
            DataTable ds = null;
            try
            {
                cmd.CommandText = commandtext;
                ds = this.ExecuteDataTable();
            }

            catch
            {
                throw;
            }

            return ds;
        }

        public string CommandText
        {
            get
            {
                return cmd.CommandText;
            }
            set
            {
                cmd.CommandText = value;
                cmd.Parameters.Clear();
            }
        }

        public IDataParameterCollection Parameters
        {
            get
            {
                return cmd.Parameters;
            }
        }

        public void AddParameterNullInt(string paramname, Nullable<int> paramvalue, SqlDbType tipo)
        {
            SqlParameter param = new SqlParameter(paramname, tipo);
            if (paramvalue == null)
            {
                param.Value = DBNull.Value;
            }
            else
            {
                param.Value = paramvalue;
            }
            cmd.Parameters.Add(param);
        }
        public void AddParameterNullDouble(string paramname, Nullable<double> paramvalue, SqlDbType tipo)
        {
            SqlParameter param = new SqlParameter(paramname, tipo);
            if (paramvalue == null)
            {
                param.Value = DBNull.Value;
            }
            else
            {
                param.Value = paramvalue;
            }
            cmd.Parameters.Add(param);
        }
        public void AddParameterNullDateTime(string paramname, Nullable<DateTime> paramvalue, SqlDbType tipo)
        {
            SqlParameter param = new SqlParameter(paramname, tipo);
            if (paramvalue == null)
            {
                param.Value = DBNull.Value;
            }
            else
            {
                param.Value = paramvalue;
            }
            cmd.Parameters.Add(param);
        }
        public void AddParameterNullDecimal(string paramname, Nullable<decimal> paramvalue, SqlDbType tipo)
        {
            SqlParameter param = new SqlParameter(paramname, tipo);
            if (paramvalue == null)
            {
                param.Value = DBNull.Value;
            }
            else
            {
                param.Value = paramvalue;
            }
            cmd.Parameters.Add(param);
        }
        public void AddParameterNullString(string paramname, string paramvalue, SqlDbType tipo)
        {
            SqlParameter param = new SqlParameter(paramname, tipo);
            if (paramvalue.Trim().Length == 0)
            {
                param.Value = DBNull.Value;
            }
            else
            {
                param.Value = paramvalue;
            }
            cmd.Parameters.Add(param);
        }
        public void AddParameter(string paramname, object paramvalue)
        {
            SqlParameter param = new SqlParameter(paramname, paramvalue);
            cmd.Parameters.Add(param);
        }
        public void AddParameter(string paramname, object paramvalue, SqlDbType tipo)
        {
            SqlParameter param = new SqlParameter(paramname, tipo);
            param.Value = paramvalue;
            cmd.Parameters.Add(param);
        }
        public void AddOutParameter(string paramname, object paramvalue)
        {
            SqlParameter param = new SqlParameter(paramname, paramvalue);
            cmd.Parameters.Add(param);
        }
        public void agregarParametroSalida(IDataParameter param)
        {
            cmd.Parameters.Add(param.Direction = ParameterDirection.Output);
        }
        public void agregarParametroSalida(string paramname, SqlDbType tipo, int tamaño)//, int tamaño
        {
            SqlParameter param = new SqlParameter(paramname, tipo ,tamaño);//,tamaño
            param.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(param);
        }
        public object obtenerParametroSalida(string paramname)//, int tamaño
        {
            return ((SqlParameter)cmd.Parameters[paramname]).Value;
        }
        public void AddParameter(IDataParameter param)
        {
            cmd.Parameters.Add(param);
        }

        public SqlConnection ConnectionString
        {
            get
            {
                return conexion;
            }
            set
            {
                conexion = value;
            }
        }
        private void Open()
        {
            cmd.Connection.Open();
        }

        private void Close()
        {
            cmd.Connection.Close();
        }

        public bool HandleExceptions
        {
            get
            {
                return handleErrors;
            }
            set
            {
                handleErrors = value;
            }
        }

        public string LastError
        {
            get
            {
                return strLastError;
            }
        }

        public void Dispose()
        {
            cmd.Dispose();
        }



    }
}
