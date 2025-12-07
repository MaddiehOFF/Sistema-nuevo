
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { EmployeeManagement } from './components/EmployeeManagement';
import { OvertimeLog } from './components/OvertimeLog';
import { AIReport } from './components/AIReport';
import { SanctionsLog } from './components/SanctionsLog';
import { EmployeeFiles } from './components/EmployeeFiles';
import { Login } from './components/Login';
import { UserManagement } from './components/UserManagement';
import { MemberView } from './components/MemberView';
import { PayrollManagement } from './components/PayrollManagement';
import { ForumBoard } from './components/ForumBoard';
import { AdminHub } from './components/AdminHub';
import { ConstructionView } from './components/ConstructionView';
import { InventoryManager } from './components/InventoryManager';
import { CashRegister } from './components/CashRegister';
import { ProductManagement } from './components/ProductManagement';
import { FinanceDashboard } from './components/FinanceDashboard';
import { WalletView } from './components/WalletView';
import { RoyaltiesManagement } from './components/RoyaltiesManagement';
import { StatisticsDashboard } from './components/StatisticsDashboard';
import { SettingsView } from './components/SettingsView';
import { Employee, OvertimeRecord, View, SanctionRecord, User, AbsenceRecord, Task, ForumPost, AdminTask, InventoryItem, InventorySession, CashShift, Product, WalletTransaction, Partner, CalculatorProjection, FixedExpense, RoleAccessConfig, ChecklistSnapshot } from './types';
import { HelpAssistant } from './components/HelpAssistant';
import { TourGuide } from './components/TourGuide';

const App: React.FC = () => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sushiblack_theme');
    return saved ? saved === 'dark' : true; 
  });

  // Tour State
  const [showTour, setShowTour] = useState(false);

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentMember, setCurrentMember] = useState<Employee | null>(null);

  // App Data State
  const [currentView, setView] = useState<View>(View.DASHBOARD);
  
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('sushiblack_employees');
    return saved ? JSON.parse(saved) : [];
  });

  const [records, setRecords] = useState<OvertimeRecord[]>(() => {
    const saved = localStorage.getItem('sushiblack_records');
    return saved ? JSON.parse(saved) : [];
  });

  const [absences, setAbsences] = useState<AbsenceRecord[]>(() => {
    const saved = localStorage.getItem('sushiblack_absences');
    return saved ? JSON.parse(saved) : [];
  });

  const [sanctions, setSanctions] = useState<SanctionRecord[]>(() => {
    const saved = localStorage.getItem('sushiblack_sanctions');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('sushiblack_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [checklistSnapshots, setChecklistSnapshots] = useState<ChecklistSnapshot[]>(() => {
      const saved = localStorage.getItem('sushiblack_checklist_snapshots');
      return saved ? JSON.parse(saved) : [];
  });
  
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('sushiblack_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [adminTasks, setAdminTasks] = useState<AdminTask[]>(() => {
    const saved = localStorage.getItem('sushiblack_admin_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [holidays, setHolidays] = useState<string[]>(() => {
    const saved = localStorage.getItem('sushiblack_holidays');
    return saved ? JSON.parse(saved) : [];
  });

  // PRODUCT STATE
  const [products, setProducts] = useState<Product[]>(() => {
      const saved = localStorage.getItem('sushiblack_products');
      if (saved) return JSON.parse(saved);
      return [
          { id: '1', name: 'Avocado - X4 U', laborCost: 2200, materialCost: 1352, royalties: 914, profit: 2134 },
          // ... (Rest of default products)
      ];
  });

  // INVENTORY STATE
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(() => {
      const saved = localStorage.getItem('sushiblack_inv_items');
      if (saved) return JSON.parse(saved);
      return [
          { id: '1', name: 'SALMON', unit: 'Kg' },
          { id: '2', name: 'QUESOS', unit: 'Kg' },
          { id: '3', name: 'PALTAS', unit: 'Kg' },
          { id: '4', name: 'ARROZ', unit: 'Kg' },
          { id: '5', name: 'ALGAS', unit: 'Paq' },
          { id: '6', name: 'LANGO BOLSA', unit: 'Un' },
          { id: '7', name: 'LANGO H', unit: 'Un' },
      ];
  });

  const [inventorySessions, setInventorySessions] = useState<InventorySession[]>(() => {
      const saved = localStorage.getItem('sushiblack_inv_sessions');
      return saved ? JSON.parse(saved) : [];
  });

  // CASH REGISTER STATE
  const [cashShifts, setCashShifts] = useState<CashShift[]>(() => {
      const saved = localStorage.getItem('sushiblack_cash_shifts');
      return saved ? JSON.parse(saved) : [];
  });

  // WALLET STATE
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
      const saved = localStorage.getItem('sushiblack_wallet_tx');
      return saved ? JSON.parse(saved) : [];
  });

  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>(() => {
      const saved = localStorage.getItem('sushiblack_fixed_expenses');
      let data = saved ? JSON.parse(saved) : [];
      return data.map((d: any) => ({ ...d, paidAmount: d.paidAmount || (d.isPaid ? d.amount : 0) }));
  });

  // ROYALTIES & PARTNERS STATE
  const [partners, setPartners] = useState<Partner[]>(() => {
      const saved = localStorage.getItem('sushiblack_partners');
      return saved ? JSON.parse(saved) : [
          { id: '1', name: 'Socio 1', sharePercentage: 25, balance: 0 },
          { id: '2', name: 'Socio 2', sharePercentage: 25, balance: 0 },
          { id: '3', name: 'Socio 3', sharePercentage: 25, balance: 0 },
          { id: '4', name: 'Socio 4', sharePercentage: 25, balance: 0 },
      ];
  });

  const [projections, setProjections] = useState<CalculatorProjection[]>(() => {
      const saved = localStorage.getItem('sushiblack_projections');
      return saved ? JSON.parse(saved) : [];
  });

  // SETTINGS & ROLES STATE
  const [roleAccess, setRoleAccess] = useState<RoleAccessConfig>(() => {
      const saved = localStorage.getItem('sushiblack_role_access');
      if (saved) return JSON.parse(saved);
      // Default Config
      return {
          'JEFE_COCINA': [View.INVENTORY],
          'COORDINADOR': [View.INVENTORY, View.CASH_REGISTER], // Requirement Met
          'MOSTRADOR': [View.CASH_REGISTER],
          'ADMINISTRATIVO': [View.CASH_REGISTER],
          'GERENTE': [View.INVENTORY, View.CASH_REGISTER],
          'EMPRESA': [View.INVENTORY, View.CASH_REGISTER],
      };
  });

  const [customRoles, setCustomRoles] = useState<string[]>(() => {
      const saved = localStorage.getItem('sushiblack_custom_roles');
      return saved ? JSON.parse(saved) : [];
  });

  // USER STATE with GRANULAR PERMISSIONS
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sushiblack_users');
    let parsedUsers: User[] = saved ? JSON.parse(saved) : [];

    if (parsedUsers.length === 0) {
      parsedUsers = [{
        id: 'admin-1',
        username: 'admin',
        email: 'admin@sushiblack.com',
        password: 'admin',
        name: 'Administrador',
        role: 'ADMIN',
        permissions: {
          viewHr: true,
          manageHr: true,
          viewOps: true,
          manageOps: true,
          viewFinance: true,
          manageFinance: true,
          viewInventory: true,
          manageInventory: true,
          superAdmin: true
        }
      }];
    }
    return parsedUsers;
  });

  // ROBUST MIGRATION ON MOUNT
  useEffect(() => {
      setUsers(currentUsers => currentUsers.map(u => {
          if (u.role === 'ADMIN') {
              return {
                  ...u,
                  permissions: {
                      viewHr: true, manageHr: true,
                      viewOps: true, manageOps: true,
                      viewFinance: true, manageFinance: true,
                      viewInventory: true, manageInventory: true,
                      superAdmin: true
                  }
              };
          }
          if (!u.permissions) {
              return {
                  ...u,
                  permissions: {
                      viewHr: false, manageHr: false,
                      viewOps: true, manageOps: false,
                      viewFinance: false, manageFinance: false,
                      viewInventory: true, manageInventory: false,
                      superAdmin: false
                  }
              }
          }
          return u;
      }));
  }, []);

  // Persistence Effects
  useEffect(() => { localStorage.setItem('sushiblack_employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('sushiblack_records', JSON.stringify(records)); }, [records]);
  useEffect(() => { localStorage.setItem('sushiblack_absences', JSON.stringify(absences)); }, [absences]);
  useEffect(() => { localStorage.setItem('sushiblack_sanctions', JSON.stringify(sanctions)); }, [sanctions]);
  useEffect(() => { localStorage.setItem('sushiblack_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('sushiblack_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('sushiblack_checklist_snapshots', JSON.stringify(checklistSnapshots)); }, [checklistSnapshots]);
  useEffect(() => { localStorage.setItem('sushiblack_posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem('sushiblack_admin_tasks', JSON.stringify(adminTasks)); }, [adminTasks]);
  useEffect(() => { localStorage.setItem('sushiblack_holidays', JSON.stringify(holidays)); }, [holidays]);
  useEffect(() => { localStorage.setItem('sushiblack_inv_items', JSON.stringify(inventoryItems)); }, [inventoryItems]);
  useEffect(() => { localStorage.setItem('sushiblack_inv_sessions', JSON.stringify(inventorySessions)); }, [inventorySessions]);
  useEffect(() => { localStorage.setItem('sushiblack_cash_shifts', JSON.stringify(cashShifts)); }, [cashShifts]);
  useEffect(() => { localStorage.setItem('sushiblack_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('sushiblack_wallet_tx', JSON.stringify(walletTransactions)); }, [walletTransactions]);
  useEffect(() => { localStorage.setItem('sushiblack_partners', JSON.stringify(partners)); }, [partners]);
  useEffect(() => { localStorage.setItem('sushiblack_projections', JSON.stringify(projections)); }, [projections]);
  useEffect(() => { localStorage.setItem('sushiblack_fixed_expenses', JSON.stringify(fixedExpenses)); }, [fixedExpenses]);
  useEffect(() => { localStorage.setItem('sushiblack_role_access', JSON.stringify(roleAccess)); }, [roleAccess]);
  useEffect(() => { localStorage.setItem('sushiblack_custom_roles', JSON.stringify(customRoles)); }, [customRoles]);
  
  useEffect(() => {
    localStorage.setItem('sushiblack_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Auth Handlers
  const handleLogin = (user: User) => {
    const now = new Date().toISOString();
    const updatedUser = { ...user, lastLogin: now };
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    setCurrentMember(null);
    setView(View.DASHBOARD);

    const tourCompleted = localStorage.getItem('sushiblack_tour_completed');
    if (!tourCompleted) {
        setShowTour(true);
    }
  };

  const handleMemberLogin = (employee: Employee) => {
    setCurrentMember(employee);
    setCurrentUser(null);
    setView(View.MEMBER_HOME);

    const tourCompleted = localStorage.getItem(`sushiblack_tour_member_${employee.id}`);
    if (!tourCompleted) {
        setShowTour(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentMember(null);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const completeTour = () => {
      setShowTour(false);
      if (currentUser) {
        localStorage.setItem('sushiblack_tour_completed', 'true');
      } else if (currentMember) {
        localStorage.setItem(`sushiblack_tour_member_${currentMember.id}`, 'true');
      }
  };

  const royaltyPool = partners.reduce((sum, p) => sum + (p.balance || 0), 0);
  const pendingPayroll = employees.filter(e => e.active).reduce((acc, curr) => acc + curr.monthlySalary, 0);
  const pendingDebt = pendingPayroll + royaltyPool;

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
        <div className="min-h-screen bg-sushi-light dark:bg-sushi-black transition-colors duration-300" id="center-screen">
            {!currentUser && !currentMember ? (
                <Login 
                    users={users} 
                    employees={employees} 
                    onLogin={handleLogin} 
                    onMemberLogin={handleMemberLogin} 
                />
            ) : (
                <div className="flex h-screen overflow-hidden font-sans text-gray-900 dark:text-sushi-text">
                    <Sidebar 
                        currentView={currentView} 
                        setView={setView} 
                        currentUser={currentUser}
                        currentMember={currentMember}
                        onLogout={handleLogout}
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                        roleAccess={roleAccess}
                    />
                    
                    <main className="flex-1 overflow-y-auto relative">
                        <div className="p-8 max-w-7xl mx-auto min-h-full">
                            
                            {/* ADMIN VIEWS */}
                            {currentUser && (
                                <>
                                    {currentView === View.DASHBOARD && 
                                        <Dashboard 
                                            employees={employees} 
                                            records={records} 
                                            tasks={adminTasks} 
                                            inventory={inventorySessions}
                                            sanctions={sanctions}
                                            cashShifts={cashShifts}
                                            currentUser={currentUser}
                                            setView={setView}
                                        />
                                    }
                                    {currentView === View.EMPLOYEES && (currentUser.permissions.viewHr ? <EmployeeManagement employees={employees} setEmployees={setEmployees} sanctions={sanctions} /> : <AccessDenied />)}
                                    {currentView === View.FILES && (currentUser.permissions.viewHr ? <EmployeeFiles employees={employees} setEmployees={setEmployees} sanctions={sanctions} absences={absences} tasks={tasks} setTasks={setTasks} checklistSnapshots={checklistSnapshots} /> : <AccessDenied />)}
                                    {currentView === View.OVERTIME && (currentUser.permissions.viewOps ? <OvertimeLog employees={employees} records={records} setRecords={setRecords} absences={absences} setAbsences={setAbsences} holidays={holidays} setHolidays={setHolidays} /> : <AccessDenied />)}
                                    {currentView === View.PAYROLL && (currentUser.permissions.viewFinance ? 
                                        <PayrollManagement 
                                            employees={employees} 
                                            setEmployees={setEmployees}
                                            transactions={walletTransactions}
                                            setTransactions={setWalletTransactions}
                                            currentUser={currentUser}
                                        /> 
                                        : <AccessDenied />)
                                    }
                                    {currentView === View.SANCTIONS && (currentUser.permissions.viewOps ? <SanctionsLog employees={employees} sanctions={sanctions} setSanctions={setSanctions} currentUser={currentUser} /> : <AccessDenied />)}
                                    {currentView === View.USERS && (currentUser.permissions.superAdmin ? <UserManagement users={users} setUsers={setUsers} currentUser={currentUser} /> : <AccessDenied />)}
                                    {currentView === View.SETTINGS && (currentUser.permissions.superAdmin ? <SettingsView roleAccess={roleAccess} setRoleAccess={setRoleAccess} customRoles={customRoles} setCustomRoles={setCustomRoles} /> : <AccessDenied />)}
                                    {currentView === View.AI_REPORT && <AIReport employees={employees} records={records} sanctions={sanctions} />}
                                    {currentView === View.FORUM && <ForumBoard posts={posts} setPosts={setPosts} currentUser={currentUser} currentMember={currentMember} />}
                                    {currentView === View.ADMIN_HUB && <AdminHub adminTasks={adminTasks} setAdminTasks={setAdminTasks} currentUser={currentUser} allUsers={users} />}
                                    {currentView === View.INVENTORY && (currentUser.permissions.viewInventory ? <InventoryManager items={inventoryItems} setItems={setInventoryItems} sessions={inventorySessions} setSessions={setInventorySessions} userName={currentUser.name} /> : <AccessDenied />)}
                                    {currentView === View.CASH_REGISTER && <CashRegister shifts={cashShifts} setShifts={setCashShifts} userName={currentUser.name} />}
                                    
                                    {/* Product and Finance Views */}
                                    {currentView === View.PRODUCTS && (currentUser.permissions.viewFinance ? <ProductManagement products={products} setProducts={setProducts} /> : <AccessDenied />)}
                                    {currentView === View.FINANCE && (currentUser.permissions.viewFinance ? 
                                        <FinanceDashboard 
                                            products={products} 
                                            setTransactions={setWalletTransactions} 
                                            transactions={walletTransactions}
                                            projections={projections}
                                            setProjections={setProjections}
                                            userName={currentUser.name}
                                            cashShifts={cashShifts}
                                            partners={partners}
                                            setPartners={setPartners}
                                        /> 
                                        : <AccessDenied />)
                                    }
                                    {currentView === View.WALLET && (currentUser.permissions.viewFinance ? 
                                        <WalletView 
                                            transactions={walletTransactions} 
                                            setTransactions={setWalletTransactions} 
                                            pendingDebt={pendingDebt} 
                                            userName={currentUser.name} 
                                            fixedExpenses={fixedExpenses}
                                            setFixedExpenses={setFixedExpenses}
                                            employees={employees}
                                            currentUser={currentUser}
                                        /> 
                                        : <AccessDenied />)
                                    }
                                    {currentView === View.ROYALTIES && (currentUser.permissions.viewFinance ? 
                                        <RoyaltiesManagement 
                                            partners={partners} 
                                            setPartners={setPartners} 
                                            royaltyPool={royaltyPool} 
                                            setTransactions={setWalletTransactions} 
                                            transactions={walletTransactions}
                                            userName={currentUser.name}
                                        /> 
                                        : <AccessDenied />)
                                    }
                                    {currentView === View.STATISTICS && (currentUser.permissions.viewFinance ? 
                                        <StatisticsDashboard 
                                            cashShifts={cashShifts}
                                            walletTransactions={walletTransactions}
                                        /> 
                                        : <AccessDenied />)
                                    }

                                    {currentView === View.AI_FOCUS && <ConstructionView title="Enfoque IA 2.0" description="Estamos entrenando modelos predictivos para anticipar la demanda de pedidos y optimizar turnos." />}
                                </>
                            )}

                            {/* MEMBER VIEWS */}
                            {currentMember && (
                                <>
                                    {currentView === View.MEMBER_HOME && (
                                        <MemberView 
                                            currentView={currentView} 
                                            member={currentMember} 
                                            records={records} 
                                            absences={absences} 
                                            sanctions={sanctions}
                                            tasks={tasks}
                                            setTasks={setTasks}
                                            posts={posts}
                                            setPosts={setPosts}
                                            setView={setView}
                                            checklistSnapshots={checklistSnapshots}
                                            setChecklistSnapshots={setChecklistSnapshots}
                                        />
                                    )}
                                    {(currentView === View.MEMBER_CALENDAR || currentView === View.MEMBER_TASKS || currentView === View.MEMBER_FILE || currentView === View.MEMBER_FORUM) && (
                                        <MemberView 
                                            currentView={currentView} 
                                            member={currentMember} 
                                            records={records} 
                                            absences={absences} 
                                            sanctions={sanctions}
                                            tasks={tasks}
                                            setTasks={setTasks}
                                            posts={posts}
                                            setPosts={setPosts}
                                            checklistSnapshots={checklistSnapshots}
                                            setChecklistSnapshots={setChecklistSnapshots}
                                        />
                                    )}
                                    {currentView === View.INVENTORY && (
                                        <InventoryManager items={inventoryItems} setItems={setInventoryItems} sessions={inventorySessions} setSessions={setInventorySessions} userName={currentMember.name} />
                                    )}
                                    {currentView === View.CASH_REGISTER && (
                                        <CashRegister shifts={cashShifts} setShifts={setCashShifts} userName={currentMember.name} />
                                    )}
                                </>
                            )}

                        </div>
                        {currentUser && (
                            <div id="help-button">
                                <HelpAssistant />
                            </div>
                        )}
                        <TourGuide 
                            isOpen={showTour} 
                            onComplete={completeTour} 
                            mode={currentUser ? 'ADMIN' : 'MEMBER'} 
                        />
                    </main>
                </div>
            )}
        </div>
    </div>
  );
};

const AccessDenied = () => (
    <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-sushi-muted opacity-50">
        <span className="text-4xl">⚠️</span>
        <p className="mt-4 font-medium">Acceso Denegado</p>
    </div>
);

export default App;
