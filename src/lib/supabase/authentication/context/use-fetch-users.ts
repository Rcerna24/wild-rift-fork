import { UserProfile } from "@/model/user-profile";
import { useQuery } from "@tanstack/react-query";

type AccountApiRow = {
  user_id: string
  first_name: string
  middle_name?: string | null
  last_name: string
  email: string
  role: string
  prc_exam_type?: string | null
  created_at?: string | null
}

const toUserRole = (role: string): "Instructor" | "Student" | "Admin" => {
  if (role === "Instructor" || role === "Student" || role === "Admin") {
    return role
  }

  return "Student"
}

const fetchUsers = async () : Promise<UserProfile[]> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const response = await fetch(`${backendUrl}/api/accounts`);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error || "Failed to fetch users");
  }

  const data: AccountApiRow[] = Array.isArray(payload?.accounts) ? payload.accounts : [];

  const users: UserProfile[] = [];

  data.forEach((user: AccountApiRow) => {
    users.push(new UserProfile({
      user_id: user.user_id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      email: user.email,
      role: toUserRole(user.role),
      prc_exam_type: user.prc_exam_type ?? null,
      dateCreated: user.created_at ?? undefined,
    }));
  });

  return users;
}


export const useFetchUsers = () => {
  // A query to get all users
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['profiles'],
    queryFn: fetchUsers,
    // We can set a reasonable stale time for the users data, since it may change (e.g. if an admin creates a new account)
    staleTime: 5 * 60 * 1000 // 5 minutes
  })

  return { users: users ?? [], isLoading, refetch };
}
