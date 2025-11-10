// Mock product + auth (demo only)
export const PRODUCTS = [
  {
    id: 'navratan-mixture',
    name: 'Navratan Mixture',
    price: 139,
    weight: '200g',
    img: 'https://www.bbassets.com/media/uploads/p/l/40233526_5-lets-try-navratan-mixture-snacks-crispy-crunchy-high-in-quality.jpg',
    tags: ['namkeen','spicy'],
    description: 'Crunchy traditional mixture made with premium ingredients and groundnut oil.'
  },
  {
    id: 'aloo-wafers',
    name: 'Aloo Potato Wafers',
    price: 89,
    weight: '120g',
    img: 'https://m.media-amazon.com/images/I/718YOioj9ZL._AC_UF894,1000_QL80_.jpg',
    tags: ['chips'],
    description: 'Thin crispy potato wafers fried in groundnut oil.'
  },
  {
    id: 'roasted-makhana',
    name: 'Roasted Makhana',
    price: 199,
    weight: '150g',
    img: 'https://www.bbassets.com/media/uploads/p/xl/40233537_6-lets-try-aloopotato-wafers-crispy-crunchy-high-in-quality.jpg',
    tags: ['healthy'],
    description: 'Lightly roasted makhana tossed with a hint of salt and spices.'
  }
]

export function fetchProducts(){ return new Promise(r => setTimeout(()=>r(PRODUCTS), 300)) }
export function fetchProductById(id){ return new Promise(r => setTimeout(()=>r(PRODUCTS.find(p=>p.id===id)), 200)) }

// Simple demo auth using localStorage (replace with Firebase or backend in production)
export function signUp({name,email,password}){
  const users = JSON.parse(localStorage.getItem('lt_users')||'[]')
  if(users.find(u=>u.email===email)) throw new Error('Email already exists')
  const user = { id: 'u_'+Date.now(), name, email, password }
  users.push(user)
  localStorage.setItem('lt_users', JSON.stringify(users))
  return { id: user.id, name: user.name, email: user.email }
}
export function signIn({email,password}){
  const users = JSON.parse(localStorage.getItem('lt_users')||'[]')
  const user = users.find(u=>u.email===email && u.password===password)
  if(!user) throw new Error('Invalid credentials')
  const token = 'tok_'+Date.now()
  localStorage.setItem('lt_session', JSON.stringify({ token, user: { id: user.id, name: user.name, email: user.email } }))
  return { token, user: { id: user.id, name: user.name, email: user.email } }
}
export function signOut(){ localStorage.removeItem('lt_session') }
export function getSession(){ return JSON.parse(localStorage.getItem('lt_session')||'null') }
