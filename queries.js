const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'admin',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const getEmployee = async (request,response) => {
    const   query='SELECT * FROM COMPANY ;'
    try {
      await pool.connect();
      const {rows}= await pool.query(query);
      console.table(rows);
      response.status(200).json(rows)
    }catch (error){
      console.error(error.stack);
    }
    };

  const getEmployeeDept = async (request,response) => {
  const   query='SELECT EMP_ID,NAME,DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;'
  try {
    await pool.connect();
    const {rows}= await pool.query(query);
    console.table(rows);
    response.status(200).json(rows)
  }catch (error){
    console.error(error.stack);
  }
  };
  const getDepartmentDetails = async (request,response) => {
    const   query='SELECT EMP_ID,NAME,DEPT FROM COMPANY RIGHT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;'
    try {
      await pool.connect();
      const {rows}= await pool.query(query);
      console.table(rows);
      response.status(200).json(rows)
    }catch (error){
      console.error(error.stack);
    }
    };
    const getDepartments = async (request,response) => {
      const   query='SELECT * FROM DEPARTMENT;'
      try {
        await pool.connect();
        const {rows}= await pool.query(query);
        console.table(rows);
        response.status(200).json(rows)
      }catch (error){
        console.error(error.stack);
      }
      };

      const getSalaryByEmpId=async (request,response)=>{
        const id = parseInt(request.params.id)
        pool.query('SELECT SALARY,NAME FROM COMPANY WHERE ID=$1;',[id],(error,results) =>{
          if(error){
            throw error
            }
          response.status(200).json(results.rows)
      })
      }

      const getSalariesOfEmployee= async(request,response)=>{
     const query='SELECT NAME,SALARIES FROM COMPANY LEFT OUTER JOIN EMPLOYEE_DETAILS ON COMPANY.ID=EMPLOYEE_DETAILS.EMP_ID;'
        try {
          await pool.connect();
          const {rows}= await pool.query(query);
          console.table(rows);
          response.status(200).json(rows)
        }catch (error){
          console.error(error.stack);
        }
      }
      const getAddressOfEmployee= async(request,response)=>{
        const query='SELECT NAME,ADDRESSES FROM COMPANY LEFT OUTER JOIN EMPLOYEE_DETAILS ON COMPANY.ID=EMPLOYEE_DETAILS.EMP_ID;'
           try {
             await pool.connect();
             const {rows}= await pool.query(query);
             console.table(rows);
             response.status(200).json(rows)
           }catch (error){
             console.error(error.stack);
           }
         }
      

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added :${results.rows[0].name}`)
    })
  }

  const createNewEmployee = (request, response) => {
    const { id,name,age,address,salary,join_date } = request.body
    console.log("reached");
    pool.query('INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [id,name,age,address,salary,join_date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added :${results.rows[0].name}`)
    })
  }
  const createNewDept = (request, response) => {
    const { id,dept,emp_id } = request.body
  
    pool.query('INSERT INTO DEPARTMENT (ID,DEPT,EMP_ID) VALUES ($1,$2,$3) RETURNING *', [id,dept,emp_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added :${results.rows[0].dept}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id} and name:`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

 

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    createNewDept,
    getDepartments,
    createNewEmployee,
    getSalaryByEmpId,
    getDepartmentDetails,
    updateUser,
    deleteUser,
    getAddressOfEmployee,
    getEmployeeDept,
    getEmployee,
    getSalariesOfEmployee
  }