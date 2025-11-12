const RoleLocal = "Role"

export const userRole =
{
    IsAdmin()
    {
        
        return localStorage.getItem(RoleLocal) == "admin" ? true : false;
    },
    set(Role)
    {
        localStorage.setItem(RoleLocal,Role)
        // console.log(Role);
    },
    get()
    {
        
        return localStorage.getItem(RoleLocal);
    },
    clear()
    {
        localStorage.removeItem(RoleLocal);
    }
    
}