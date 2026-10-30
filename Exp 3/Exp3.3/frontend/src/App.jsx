import React,{useEffect,useMemo,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login,logout} from './store'
import api,{errorMessage} from './api'
import {Activity,ArrowRight,BarChart3,Bell,CalendarDays,Check,ChevronDown,Clock3,FileText,Globe,LayoutDashboard,LogOut,Menu,Plus,Send,Settings2,ShieldCheck,Sparkles,Trash2,Users,Wallet2,X} from 'lucide-react'

const links=[['Overview',LayoutDashboard],['Composer',FileText],['Calendar',CalendarDays],['Analytics',BarChart3],['Team',Users]]
const statuses={DRAFT:'draft',SCHEDULED:'scheduled',QUEUED:'queued',PUBLISHED:'published'}
const fmt=date=>date?new Date(date).toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'—'
const normalize=dt=>dt?.replace('Z','') || ''
const label=val=>val?.toLowerCase().replace(/^./,c=>c.toUpperCase()) || ''

function AuthView(){
 const dispatch=useDispatch();const [mode,setMode]=useState('login')
 const [name,setName]=useState('');const [email,setEmail]=useState('');const [password,setPassword]=useState('')
 const [working,setWorking]=useState(false);const[error,setError]=useState('')
 async function submit(e){e.preventDefault();setWorking(true);setError('');try{
  const payload=mode==='register'?{name,email,password}:{email,password}
  const {data}=await api.post('/auth/'+(mode==='register'?'register':'login'),payload)
  dispatch(login(data))
 }catch(err){setError(errorMessage(err))}finally{setWorking(false)}}
 return <div className="auth-page"><div className="auth-glow"/><div className="auth-left">
  <div className="brand"><div className="brand-mark"><Activity size={23}/></div><span>pulse<span className="brand-accent">desk</span></span></div>
  <div className="auth-hero"><span className="eyebrow"><Sparkles size={14}/> YOUR CONTENT COMMAND CENTER</span>
   <h1>Everything you need to <em>create, plan</em> and grow.</h1>
   <p>A connected studio for posts, calendars, collaboration and performance. Built for teams with big ideas.</p>
   <div className="auth-visual"><div className="auth-visual-top"><span className="tiny-dot"/> Publishing activity <span className="right-mini">LIVE PREVIEW</span></div>
    <div className="visual-bars">{[34,52,45,77,59,82,64,94,76,100,73,86].map((h,i)=><span key={i} style={{height:h+'%'}}/>)}</div>
    <div className="visual-foot"><span>Build consistency. Make an impact.</span><span className="tag">DEMO</span></div>
   </div>
  </div>
  <div className="auth-fineprint">Experiment 3.3 • Full-stack integration & capstone</div>
 </div><div className="auth-right"><div className="auth-form-shell"><div className="auth-mark">✦</div>
  <h2>{mode==='register'?'Build your workspace':'Welcome back'}</h2>
  <p className="subtle">{mode==='register'?'Create your account and start planning.':'Sign in to manage your content studio.'}</p>
  <form onSubmit={submit} className="auth-form">{mode==='register'&&<label>Full name<input required placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}/></label>}
   <label>Email address<input required type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></label>
   <label>Password<input required type="password" minLength={mode==='register'?8:1} placeholder="At least 8 characters" value={password} onChange={e=>setPassword(e.target.value)}/></label>
   {error&&<div className="alert error">{error}</div>}
   <button disabled={working} type="submit" className="primary full">{working?'Please wait…':mode==='login'?'Sign in':'Create workspace'} <ArrowRight size={17}/></button>
  </form><div className="auth-switch">{mode==='login'?"New to PulseDesk?":"Already have an account?"} <button onClick={()=>{setMode(mode==='login'?'register':'login');setError('')}}>{mode==='login'?'Create account':'Sign in'}</button></div>
  <p className="demo-disclaimer"><ShieldCheck size={14}/> Academic demo. Social publishing is simulated; no external platforms are connected.</p>
 </div></div></div>
}

function StatCard({icon:Icon,name,value,hint,tone}){return <div className="stat-card"><div className="stat-top"><span>{name}</span><span className={'stat-icon '+tone}><Icon size={18}/></span></div><strong>{value??'—'}</strong><small>{hint}</small></div>}
function PostRow({post,onPublish,onDelete,canEdit}){
 return <div className="post-row"><span className={'post-platform '+post.platform.toLowerCase()}>{post.platform.slice(0,1)}</span><div className="post-info"><div className="post-title">{post.content}</div><div className="post-sub">{post.platform} <span>·</span> {post.status==='PUBLISHED'?'Published '+fmt(post.publishedAt):post.status==='DRAFT'?'Draft': 'Scheduled '+fmt(post.scheduledAt)}</div></div><span className={'status '+statuses[post.status]}>{label(post.status)}</span>{canEdit&&(post.status==='DRAFT'||post.status==='SCHEDULED')&&<div className="post-actions"><button title="Publish via demo queue" onClick={()=>onPublish(post.id)}><Send size={16}/></button><button title="Delete post" onClick={()=>onDelete(post.id)}><Trash2 size={16}/></button></div>}</div>
}
function Composer({onCreate,role}){
 const [content,setContent]=useState('');const[platform,setPlatform]=useState('DEMO');const[date,setDate]=useState('');const [busy,setBusy]=useState(false)
 const canEdit=role!=='VIEWER'
 async function submit(e){e.preventDefault();setBusy(true);try{
  await onCreate({content,platform,scheduledAt:date?new Date(date).toISOString():null});setContent('');setDate('')
 }finally{setBusy(false)}}
 return <div className="columns composer-cols"><section className="panel"><div className="section-head"><div><h3>Create a post</h3><p>Your next big idea starts here.</p></div><span className="outline-pill"><Sparkles size={13}/> Compose</span></div>
   <form onSubmit={submit}><label className="form-label">Publishing platform</label><div className="platform-grid">{['DEMO','INSTAGRAM','LINKEDIN','X'].map(p=><button disabled={!canEdit} key={p} type="button" className={'platform-option '+(p===platform?'active':'')} onClick={()=>setPlatform(p)}><span>{p.slice(0,1)}</span>{label(p)}</button>)}</div>
    <label className="form-label" htmlFor="content">Post content</label><textarea disabled={!canEdit} required id="content" rows="7" maxLength={2000} placeholder="What would you like to share with your audience?" value={content} onChange={e=>setContent(e.target.value)}/><div className="char-count">{content.length} / 2000</div>
    <label className="form-label" htmlFor="scheduled">Schedule for <span className="subtle">(optional — leave blank for a draft)</span></label><input disabled={!canEdit} id="scheduled" type="datetime-local" value={date} onChange={e=>setDate(e.target.value)}/>
    <div className="composer-submit"><button disabled={!canEdit||busy||!content.trim()} type="submit" className="primary"><Plus size={17}/>{busy?'Saving…':date?'Schedule post':'Save draft'}</button></div>
   </form></section><aside className="panel preview-panel"><div className="section-head"><div><h3>Live preview</h3><p>A look at what you're crafting.</p></div></div><div className="post-preview"><div className="preview-profile"><span className="avatar">P</span><div><b>Your brand</b><small>@yourworkspace · Just now</small></div><span className="preview-more">•••</span></div><p>{content||'Your brilliant post will appear here as you type. Take your time and make it yours.'}</p><div className="preview-gradient"><Sparkles size={34} /></div><div className="preview-reacts">♡ <span>↗</span> ◻</div></div><div className="info-box"><ShieldCheck size={18}/><div><b>Safe demo mode</b><p>Posts marked “Published” are processed inside this application only. No real platform API is called.</p></div></div></aside></div>
}
function CalendarView({posts}){
 const today=new Date();const [offset,setOffset]=useState(0)
 const first=new Date(today.getFullYear(),today.getMonth()+offset,1)
 const start=(first.getDay()+6)%7
 const days=new Date(first.getFullYear(),first.getMonth()+1,0).getDate()
 const dayPosts=useMemo(()=>{const grouped={};posts.forEach(p=>{
  if(!p.scheduledAt)return;const d=new Date(p.scheduledAt);if(d.getFullYear()===first.getFullYear()&&d.getMonth()===first.getMonth()){(grouped[d.getDate()]??=[]).push(p)}});return grouped
 },[posts,offset])
 return <section className="panel calendar-panel"><div className="section-head"><div><h3>Publishing calendar</h3><p>Plan and see all your upcoming posts at a glance.</p></div><div className="month-nav"><button onClick={()=>setOffset(o=>o-1)}>‹</button><strong>{first.toLocaleString(undefined,{month:'long',year:'numeric'})}</strong><button onClick={()=>setOffset(o=>o+1)}>›</button></div></div>
 <div className="calendar-grid">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><div className="week-label" key={d}>{d}</div>)}
  {Array.from({length:start},(_,i)=><div className="day empty" key={'blank'+i}/>)}
  {Array.from({length:days},(_,i)=>{const day=i+1,isToday=day===today.getDate()&&first.getMonth()===today.getMonth()&&first.getFullYear()===today.getFullYear();return <div key={day} className={'day '+(isToday?'today':'')}><span className="day-number">{day}</span>{(dayPosts[day]||[]).slice(0,2).map(p=><div title={p.content} key={p.id} className={'calendar-event '+statuses[p.status]}>{p.content}</div>)}{(dayPosts[day]||[]).length>2&&<small>+{dayPosts[day].length-2} more</small>}</div>})}
 </div></section>
}
function AnalyticsView({analytics,posts}){
 const total=Math.max(analytics?.total || 0,1);const byPlatform=Object.entries(analytics?.byPlatform || {})
 const published=posts.filter(p=>p.status==='PUBLISHED').length
 return <div className="analytics-layout"><div className="stat-grid"><StatCard icon={FileText} name="Total posts" value={analytics?.total??0} hint="Across your workspace" tone="blue"/><StatCard icon={Send} name="Demo published" value={published} hint="Completed via Kafka" tone="purple"/><StatCard icon={Clock3} name="Scheduled" value={analytics?.scheduled??0} hint="Waiting to publish" tone="orange"/><StatCard icon={Check} name="Completion" value={Math.round(published/total*100)+'%'} hint="Of all created posts" tone="green"/></div>
 <div className="columns"><div className="panel"><div className="section-head"><div><h3>Content by platform</h3><p>How you've distributed your posts.</p></div></div>{byPlatform.length?byPlatform.map(([platform,count])=><div className="bar-item" key={platform}><div className="bar-label"><span>{label(platform)}</span><b>{count} posts</b></div><div className="bar-track"><div style={{width:(100*count/total)+'%'}}/></div></div>):<Empty text="Create a post to see distribution data."/>}</div><div className="panel"><div className="section-head"><div><h3>Workflow health</h3><p>Track content through each stage.</p></div></div><div className="workflow-stats">{['draft','scheduled','queued','published'].map(key=><div key={key}><span className={'dot '+key}/><span>{label(key)}</span><strong>{analytics?.[key]??0}</strong></div>)}</div><div className="info-box"><Activity size={18}/><div><b>Workspace metrics</b><p>These are internal post counts, not engagement statistics from Instagram or LinkedIn.</p></div></div></div></div></div>
}
function TeamView({members,workspace,onAdd,canAdmin}){
 const[email,setEmail]=useState('');const[role,setRole]=useState('EDITOR');const[busy,setBusy]=useState(false)
 async function submit(e){e.preventDefault();setBusy(true);try{await onAdd({email,role});setEmail('')}finally{setBusy(false)}}
 return <div className="columns team-layout"><div className="panel"><div className="section-head"><div><h3>Team members</h3><p>Collaborate with people in your workspace.</p></div><span className="outline-pill"><Users size={14}/>{members.length} members</span></div>
 {members.map(m=><div key={m.id} className="member-row"><span className="avatar">{m.name?.slice(0,1).toUpperCase()}</span><div><b>{m.name}</b><small>{m.email}</small></div><span className="role-pill">{label(m.role)}</span></div>)}
 </div><div className="panel"><div className="section-head"><div><h3>Add a teammate</h3><p>Invite an already registered account.</p></div></div><form onSubmit={submit} className="team-form"><label className="form-label">Teammate email</label><input disabled={!canAdmin} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="teammate@example.com" required/><label className="form-label">Workspace role</label><select disabled={!canAdmin} value={role} onChange={e=>setRole(e.target.value)}><option>EDITOR</option><option>VIEWER</option><option>ADMIN</option></select><button disabled={!canAdmin||busy} type="submit" className="primary"><Users size={16}/>Add member</button></form><div className="info-box"><ShieldCheck size={18}/><div><b>Role-based access</b><p>Admins manage members; Editors create and schedule posts; Viewers have read-only access.</p></div></div></div></div>
}
function Empty({text}){return <div className="empty"><FileText size={27}/><p>{text}</p></div>}
function Dashboard(){
 const auth=useSelector(s=>s.auth);const dispatch=useDispatch();const[page,setPage]=useState('Overview');const[mobileNav,setMobileNav]=useState(false)
 const [workspaces,setWorkspaces]=useState([]);const[workspaceId,setWorkspaceId]=useState('');const[posts,setPosts]=useState([]);const[analytics,setAnalytics]=useState(null);const[members,setMembers]=useState([])
 const [loading,setLoading]=useState(true);const[toast,setToast]=useState('');const [error,setError]=useState('')
 const workspace=workspaces.find(w=>w.id===workspaceId), role=workspace?.role||'VIEWER', canEdit=role!=='VIEWER'
 function notify(message){setToast(message);window.setTimeout(()=>setToast(''),3500)}
 useEffect(()=>{(async()=>{try{const {data}=await api.get('/workspaces');setWorkspaces(data);if(data.length)setWorkspaceId(data[0].id)}catch(err){setError(errorMessage(err))}finally{setLoading(false)}})()},[])
 async function refresh(id=workspaceId){if(!id)return;try{
  const [p,a,m]=await Promise.all([api.get(`/workspaces/${id}/posts`),api.get(`/workspaces/${id}/analytics`),api.get(`/workspaces/${id}/members`)])
  setPosts(p.data);setAnalytics(a.data);setMembers(m.data);setError('')
 }catch(err){setError(errorMessage(err))}}
 useEffect(()=>{if(workspaceId){refresh(workspaceId);const timer=window.setInterval(()=>refresh(workspaceId),15000);return()=>window.clearInterval(timer)}},[workspaceId])
 async function perform(operation,success){try{await operation();notify(success);await refresh()}catch(err){setError(errorMessage(err));throw err}}
 async function addPost(input){try{await perform(()=>api.post(`/workspaces/${workspaceId}/posts`,input),'Post saved successfully');setPage('Overview')}catch{}}
 async function publish(id){try{await perform(()=>api.post(`/workspaces/${workspaceId}/posts/${id}/publish`),'Added to publish queue')}catch{}}
 async function remove(id){if(!window.confirm('Delete this post?'))return;try{await perform(()=>api.delete(`/workspaces/${workspaceId}/posts/${id}`),'Post removed')}catch{}}
 async function addMember(input){try{await perform(()=>api.post(`/workspaces/${workspaceId}/members`,input),'Teammate added')}catch{}}
 const next=posts.filter(p=>p.status==='SCHEDULED').sort((a,b)=>new Date(a.scheduledAt)-new Date(b.scheduledAt))
 const recent=posts.slice(0,6)
 return <div className="app-shell"><aside className={'sidebar '+(mobileNav?'open':'')}><div className="brand"><span className="brand-mark"><Activity size={21}/></span><span>pulse<span className="brand-accent">desk</span></span></div>
 <div className="workspace-switch"><div className="workspace-logo">{(workspace?.name||'W').slice(0,1)}</div><select value={workspaceId} onChange={e=>setWorkspaceId(e.target.value)} aria-label="Workspace">{workspaces.map(w=><option key={w.id} value={w.id}>{w.name}</option>)}</select><ChevronDown size={15}/></div>
 <span className="nav-title">WORKSPACE</span><nav>{links.map(([name,Icon])=><button key={name} onClick={()=>{setPage(name);setMobileNav(false)}} className={page===name?'active':''}><Icon size={19}/>{name}{name==='Calendar'&&next.length>0&&<span className="nav-count">{next.length}</span>}</button>)}</nav>
 <div className="sidebar-bottom"><div className="side-tip"><Sparkles size={19}/><strong>Make every post count</strong><p>Plan ahead, collaborate and stay consistent.</p></div><button className="signout" onClick={()=>dispatch(logout())}><LogOut size={18}/> Sign out</button></div>
 </aside><main className="main-content"><header className="topbar"><button className="mobile-menu" onClick={()=>setMobileNav(!mobileNav)}><Menu size={23}/></button><div className="breadcrumbs">Workspace <span>/</span> <b>{page}</b></div><div className="top-right"><span className="demo-top">DEMO WORKSPACE</span><span className="top-avatar">{auth.name?.slice(0,1).toUpperCase()}</span><div className="header-name"><b>{auth.name}</b><small>{label(role)}</small></div></div></header>
 <div className="content-wrap"><div className="page-header"><div><span className="eyebrow"><span className="tiny-dot"/> CONTENT OPERATIONS</span><h1>{page==='Overview'?'Good to see you, '+auth.name?.split(' ')[0]+' 👋':page}</h1><p>{({Overview:'Here is what’s happening across your workspace today.',Composer:'Create something meaningful, then schedule it when it matters.',Calendar:'Your content schedule, mapped out beautifully.',Analytics:'Stay on top of your publishing pipeline.',Team:'The right people, all working together.'})[page]}</p></div>{page!=='Composer'&&canEdit&&<button className="primary" onClick={()=>setPage('Composer')}><Plus size={18}/> New post</button>}</div>
 {error&&<div className="alert error app-alert">{error}<button onClick={()=>setError('')}><X size={16}/></button></div>}
 {loading?<div className="panel">Loading workspace…</div>:!workspaceId?<div className="panel">No workspace found. Try registering a new account.</div>:<>
 {page==='Overview'&&<><div className="stat-grid"><StatCard icon={FileText} name="Total posts" value={analytics?.total??0} hint="All content" tone="blue"/><StatCard icon={Clock3} name="Scheduled" value={analytics?.scheduled??0} hint="Upcoming posts" tone="orange"/><StatCard icon={Send} name="Published" value={analytics?.published??0} hint="Demo processed" tone="purple"/><StatCard icon={Users} name="Team members" value={members.length} hint="In this workspace" tone="green"/></div>
 <div className="columns overview-cols"><section className="panel"><div className="section-head"><div><h3>Recent content</h3><p>A snapshot of your publishing activity.</p></div><button className="text-link" onClick={()=>setPage('Composer')}>New post <ArrowRight size={15}/></button></div>{recent.length?recent.map(p=><PostRow key={p.id} post={p} onPublish={publish} onDelete={remove} canEdit={canEdit}/>):<Empty text="Your content space is empty. Create your first post to get started."/>}</section>
 <div className="side-stack"><section className="panel"><div className="section-head"><div><h3>Coming up</h3><p>Next in your queue</p></div><CalendarDays size={18}/></div>{next.length?next.slice(0,4).map(p=><div className="upcoming-row" key={p.id}><div className="date-card"><b>{new Date(p.scheduledAt).getDate()}</b><small>{new Date(p.scheduledAt).toLocaleString(undefined,{month:'short'})}</small></div><div><b>{p.content}</b><small>{fmt(p.scheduledAt)}</small></div></div>):<Empty text="No posts scheduled yet."/>}<button className="secondary full" onClick={()=>setPage('Calendar')}>View calendar <ArrowRight size={15}/></button></section><div className="accent-card"><div className="accent-icon"><Sparkles size={20}/></div><h3>Less juggling. More creating.</h3><p>Draft, schedule, analyze — all from one beautifully connected workspace.</p><button onClick={()=>setPage('Composer')}>Start creating <ArrowRight size={15}/></button></div></div></div></>}
 {page==='Composer'&&<Composer onCreate={addPost} role={role}/>}
 {page==='Calendar'&&<CalendarView posts={posts}/>}
 {page==='Analytics'&&<AnalyticsView analytics={analytics} posts={posts}/>}
 {page==='Team'&&<TeamView workspace={workspace} members={members} onAdd={addMember} canAdmin={role==='ADMIN'}/>}
 </>}
 <footer className="footer">PulseDesk · Experiment 3.3 academic capstone <span>•</span> Demo publish mode only</footer></div>
 </main>{mobileNav&&<div className="overlay" onClick={()=>setMobileNav(false)}/ >}{toast&&<div className="toast"><Check size={17}/>{toast}</div>}</div>
}
export default function App(){const token=useSelector(s=>s.auth.token);return token?<Dashboard/>:<AuthView/>}
