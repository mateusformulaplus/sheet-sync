import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as ChevronDown, a as Search, b as ArrowDownToLine, c as Pencil, f as FolderPen, g as ChevronRight, h as ChevronUp, m as Copy, n as Trash2, o as RefreshCw, p as ExternalLink, r as Tag, s as Plus, t as X, u as LogOut, v as Check } from "../_libs/lucide-react.mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, i as Logo, n as Input, o as useServerFn, r as Label, t as Button } from "./label-BEIxUHTW.mjs";
import { a as createSsrRpc, n as clientGetToken, s as logout, t as clientClearToken } from "./auth-C8iYyVIi.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ativos-Dz17Ec6T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var listFormulas = createServerFn({ method: "GET" }).handler(createSsrRpc("e597db70b3b55b72f362907825156b04d934b7db64bade1c0660a169015446ed"));
var setPrice = createServerFn({ method: "POST" }).inputValidator((d) => {
	if (!d || typeof d.rowIndex !== "number" || typeof d.preco !== "number") throw new Error("Dados inválidos");
	if (d.token !== void 0 && typeof d.token !== "string") throw new Error("Token inválido");
	if (d.preco < 0 || d.preco > 1e6) throw new Error("Preço fora do intervalo");
	return d;
}).handler(createSsrRpc("0edabfb569494433799c215b4596fb8a8d76b5a69500bec109aa01fc54d25853"));
var addFormula = createServerFn({ method: "POST" }).inputValidator((d) => {
	if (!d || typeof d.protocolo !== "string" || typeof d.categoria !== "string") throw new Error("Dados inválidos");
	if (d.token !== void 0 && typeof d.token !== "string") throw new Error("Token inválido");
	if (typeof d.preco !== "number" || d.preco < 0 || d.preco > 1e6) throw new Error("Preço fora do intervalo");
	return d;
}).handler(createSsrRpc("553f28ac812ceea06f5123477c5dde56965849dd830acc0c7886f83d18f87748"));
var renameCategory = createServerFn({ method: "POST" }).inputValidator((d) => {
	if (!d || typeof d.oldName !== "string" || typeof d.newName !== "string") throw new Error("Dados inválidos");
	if (d.token !== void 0 && typeof d.token !== "string") throw new Error("Token inválido");
	if (!d.oldName.trim() || !d.newName.trim()) throw new Error("Nomes inválidos");
	return d;
}).handler(createSsrRpc("f23c2bc749835e674ab9b201095eff376fcea76ffe77b6c3742bbfb5c9bfcec5"));
var deleteFormula = createServerFn({ method: "POST" }).validator((d) => {
	if (!d || typeof d.rowIndex !== "number") throw new Error("Dados inválidos");
	if (d.token !== void 0 && typeof d.token !== "string") throw new Error("Token inválido");
	return d;
}).handler(createSsrRpc("6d2cc2f9270a67c86391c6978f2990dda7dabb07add04fe53e6609acc1acd7c1"));
var brl = (n) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(n);
var NEW_CATEGORY_VALUE = "__new__";
function AtivosPage() {
	const router = useRouter();
	const qc = useQueryClient();
	const listFn = useServerFn(listFormulas);
	const setPriceFn = useServerFn(setPrice);
	const addFormulaFn = useServerFn(addFormula);
	const renameCategoryFn = useServerFn(renameCategory);
	const deleteFormulaFn = useServerFn(deleteFormula);
	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ["formulas"],
		queryFn: () => listFn()
	});
	const [query, setQuery] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [draftPrice, setDraftPrice] = (0, import_react.useState)("");
	const [saveError, setSaveError] = (0, import_react.useState)(null);
	const [showAdd, setShowAdd] = (0, import_react.useState)(false);
	const [addCategoryMode, setAddCategoryMode] = (0, import_react.useState)("existing");
	const [addCategory, setAddCategory] = (0, import_react.useState)("");
	const [addNewCategory, setAddNewCategory] = (0, import_react.useState)("");
	const [addCategoryFixed, setAddCategoryFixed] = (0, import_react.useState)(false);
	const [addProtocolo, setAddProtocolo] = (0, import_react.useState)("");
	const [addPreco, setAddPreco] = (0, import_react.useState)("");
	const [addAtivos, setAddAtivos] = (0, import_react.useState)("");
	const [addObs, setAddObs] = (0, import_react.useState)("");
	const [addError, setAddError] = (0, import_react.useState)(null);
	const [renamingCategory, setRenamingCategory] = (0, import_react.useState)(null);
	const [renameValue, setRenameValue] = (0, import_react.useState)("");
	const [renameError, setRenameError] = (0, import_react.useState)(null);
	const [viewingFormula, setViewingFormula] = (0, import_react.useState)(null);
	const [copiedIndex, setCopiedIndex] = (0, import_react.useState)(null);
	const [copiedAll, setCopiedAll] = (0, import_react.useState)(false);
	const priceMutation = useMutation({
		mutationFn: (vars) => setPriceFn({ data: {
			...vars,
			token: clientGetToken()
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["formulas"] });
			setEditing(null);
			setSaveError(null);
		},
		onError: (e) => setSaveError(e instanceof Error ? e.message : "Erro ao salvar")
	});
	const addMutation = useMutation({
		mutationFn: (vars) => addFormulaFn({ data: {
			...vars,
			token: clientGetToken()
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["formulas"] });
			resetAddForm();
		},
		onError: (e) => setAddError(e instanceof Error ? e.message : "Erro ao adicionar")
	});
	const renameMutation = useMutation({
		mutationFn: (vars) => renameCategoryFn({ data: {
			...vars,
			token: clientGetToken()
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["formulas"] });
			setRenamingCategory(null);
			setRenameError(null);
		},
		onError: (e) => setRenameError(e instanceof Error ? e.message : "Erro ao renomear")
	});
	const deleteMutation = useMutation({
		mutationFn: (vars) => deleteFormulaFn({ data: {
			...vars,
			token: clientGetToken()
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["formulas"] });
			setEditing(null);
			setSaveError(null);
		},
		onError: (e) => setSaveError(e instanceof Error ? e.message : "Erro ao excluir")
	});
	const [bottomCategories, setBottomCategories] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("fplus_bottom_categories");
			if (saved) try {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed)) {
					if (!parsed.includes("Protocolos Combinados")) {
						parsed.push("Protocolos Combinados");
						localStorage.setItem("fplus_bottom_categories", JSON.stringify(parsed));
					}
					return parsed;
				}
			} catch {}
		}
		return ["Protocolos Combinados"];
	});
	const existingCategories = (0, import_react.useMemo)(() => {
		const items = data?.items ?? [];
		const set = /* @__PURE__ */ new Set();
		for (const f of items) if (f.categoria) set.add(f.categoria);
		return Array.from(set).sort();
	}, [data]);
	const groups = (0, import_react.useMemo)(() => {
		const items = data?.items ?? [];
		const q = query.trim().toLowerCase();
		const filtered = q ? items.filter((f) => f.protocolo.toLowerCase().includes(q) || f.categoria.toLowerCase().includes(q) || f.ativos.toLowerCase().includes(q)) : items;
		const map = /* @__PURE__ */ new Map();
		for (const f of filtered) {
			if (!map.has(f.categoria)) map.set(f.categoria, []);
			map.get(f.categoria).push(f);
		}
		const normalEntries = [];
		const bottomEntries = [];
		for (const entry of map.entries()) if (bottomCategories.includes(entry[0])) bottomEntries.push(entry);
		else normalEntries.push(entry);
		return [...normalEntries, ...bottomEntries];
	}, [
		data,
		query,
		bottomCategories
	]);
	const totalFormulas = (data?.items)?.length ?? 0;
	const filteredCount = groups.reduce((acc, [, items]) => acc + items.length, 0);
	const logoutFn = useServerFn(logout);
	async function onLogout() {
		clientClearToken();
		await logoutFn();
		await router.navigate({ to: "/" });
	}
	function openEdit(f) {
		setEditing(f);
		setDraftPrice(String(f.preco));
		setSaveError(null);
	}
	function saveEdit() {
		if (!editing) return;
		const n = Number(draftPrice.replace(",", "."));
		if (!Number.isFinite(n) || n < 0) {
			setSaveError("Digite um preço válido");
			return;
		}
		priceMutation.mutate({
			rowIndex: editing.rowIndex,
			preco: n
		});
	}
	function resetAddForm() {
		setShowAdd(false);
		setAddCategoryMode("existing");
		setAddCategory("");
		setAddNewCategory("");
		setAddCategoryFixed(false);
		setAddProtocolo("");
		setAddPreco("");
		setAddAtivos("");
		setAddObs("");
		setAddError(null);
	}
	function submitAdd() {
		const cat = addCategoryMode === "new" ? addNewCategory : addCategory;
		if (!cat.trim()) {
			setAddError("Selecione ou crie uma categoria");
			return;
		}
		if (!addProtocolo.trim()) {
			setAddError("Título é obrigatório");
			return;
		}
		const precoNum = Number(addPreco.replace(",", "."));
		if (!Number.isFinite(precoNum) || precoNum < 0) {
			setAddError("Preço inválido");
			return;
		}
		setAddError(null);
		if (addCategoryMode === "new" && addCategoryFixed) {
			const newBottom = [...bottomCategories];
			if (!newBottom.includes(cat.trim())) {
				newBottom.push(cat.trim());
				setBottomCategories(newBottom);
				localStorage.setItem("fplus_bottom_categories", JSON.stringify(newBottom));
			}
		}
		addMutation.mutate({
			categoria: cat.trim(),
			protocolo: addProtocolo.trim(),
			preco: precoNum,
			ativos: addAtivos.trim(),
			observacao: addObs.trim()
		});
	}
	function openRenameCategory(name) {
		setRenamingCategory(name);
		setRenameValue(name);
		setRenameError(null);
	}
	function submitRename() {
		if (!renamingCategory || !renameValue.trim()) return;
		renameMutation.mutate({
			oldName: renamingCategory,
			newName: renameValue.trim()
		});
	}
	function handleCopy(text, idx) {
		navigator.clipboard.writeText(text);
		if (idx !== void 0) {
			setCopiedIndex(idx);
			setTimeout(() => setCopiedIndex(null), 2e3);
		} else {
			setCopiedAll(true);
			setTimeout(() => setCopiedAll(false), 2e3);
		}
	}
	function openAddInCategory(categoria) {
		setViewingFormula(null);
		setAddCategoryMode("existing");
		setAddCategory(categoria);
		setShowAdd(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col brand-gradient-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "bg-card border-b border-border/50 sticky top-0 z-30 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-16 sm:h-[4.25rem] flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-9 w-auto sm:h-10 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden sm:block min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold leading-tight truncate tracking-tight",
									children: "Portal de Fórmulas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.7rem] text-muted-foreground leading-tight mt-0.5",
									children: "Dra. Francine"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 sm:gap-2",
							children: [
								data?.sheetUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									asChild: true,
									className: "hidden sm:inline-flex rounded-xl border-border/60 hover:bg-accent/60 transition-all",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: data.sheetUrl,
										target: "_blank",
										rel: "noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5 mr-1.5" }), "Planilha"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => refetch(),
									disabled: isFetching,
									className: "rounded-xl hover:bg-accent/60 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 ${isFetching ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline ml-1.5 text-xs",
										children: "Atualizar"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-5 bg-border/60 mx-0.5 hidden sm:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: onLogout,
									className: "rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline ml-1.5 text-xs",
										children: "Sair"
									})]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 sm:mb-10 animate-fade-in-up",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl sm:text-[2rem] font-extrabold tracking-tight leading-tight",
									children: "Fórmulas e Preços"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-md",
									children: "Gerencie suas fórmulas, preços e categorias. Todas as alterações são salvas na planilha em tempo real."
								}),
								!isLoading && totalFormulas > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "rounded-lg text-xs font-medium px-2.5 py-1",
										children: [totalFormulas, " fórmulas"]
									}), query && filteredCount !== totalFormulas && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "rounded-lg text-xs font-medium px-2.5 py-1",
										children: [
											filteredCount,
											" resultado",
											filteredCount !== 1 ? "s" : ""
										]
									})]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setShowAdd(true),
								className: "brand-gradient text-primary-foreground rounded-xl shadow-md shadow-primary/15 hover:opacity-[0.92] transition-all active:scale-[0.98] h-10 sm:h-11 px-5 font-semibold shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1.5" }), "Nova Fórmula"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full sm:max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Buscar fórmula, ativo ou categoria…",
								className: "pl-10 h-11 bg-white/60 border-border/50 rounded-xl text-sm placeholder:text-muted-foreground/50 transition-all duration-200 focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/15"
							})]
						})]
					})
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						0,
						1,
						2,
						3,
						4,
						5
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/40 overflow-hidden",
						style: { animationDelay: `${i * 80}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 skeleton-shimmer rounded-t-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-3/4 skeleton-shimmer rounded-lg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/2 skeleton-shimmer rounded-lg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-16 skeleton-shimmer rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-20 skeleton-shimmer rounded-md" })]
								})
							]
						})]
					}, i))
				}) : groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-24 animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-16 w-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-7 w-7 text-muted-foreground/50" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground font-medium",
							children: "Nenhuma fórmula encontrada"
						}),
						query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setQuery(""),
							className: "mt-2 text-sm text-primary hover:underline underline-offset-4 cursor-pointer",
							children: "Limpar busca"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-10",
					children: groups.map(([categoria, items], groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "animate-fade-in-up",
						style: { animationDelay: `${groupIndex * 60}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-1 rounded-full brand-gradient shrink-0" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-lg sm:text-xl font-bold text-foreground truncate",
											children: categoria
										}),
										bottomCategories.includes(categoria) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "outline",
											className: "hidden sm:inline-flex text-[0.65rem] shrink-0 border-border/60 text-muted-foreground ml-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownToLine, { className: "h-3 w-3 mr-1" }), "Fixado no final"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "shrink-0 rounded-lg text-[0.65rem] font-semibold px-2 py-0.5 tabular-nums",
									children: items.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => openRenameCategory(categoria),
									className: "shrink-0 p-1.5 rounded-lg text-muted-foreground/50 hover:text-primary hover:bg-accent/60 transition-all cursor-pointer",
									"aria-label": `Renomear categoria ${categoria}`,
									title: "Renomear categoria",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPen, { className: "h-4 w-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: items.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								onClick: () => setViewingFormula(f),
								className: "group bg-white/70 card-shadow hover:card-shadow-hover rounded-2xl border border-white/60 p-5 flex flex-col transition-all duration-300 hover:-translate-y-0.5 cursor-pointer",
								style: { animationDelay: `${groupIndex * 60 + i * 30}ms` },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold text-foreground leading-snug text-[0.95rem]",
											children: f.protocolo
										}), f.observacao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-1 italic leading-relaxed line-clamp-2",
											children: f.observacao
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: (e) => {
											e.stopPropagation();
											openEdit(f);
										},
										className: "flex items-center gap-1.5 shrink-0 rounded-xl px-3 py-2 bg-secondary/80 hover:bg-accent border border-border/40 hover:border-primary/20 transition-all duration-200 text-sm font-bold text-secondary-foreground group/btn cursor-pointer",
										"aria-label": `Editar preço de ${f.protocolo}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: brl(f.preco)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3 opacity-0 group-hover:opacity-60 group-hover/btn:opacity-100 transition-opacity duration-200" })]
									})]
								}), f.ativos && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 flex flex-wrap gap-1.5",
									children: f.ativos.split("|").map((a, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "text-[0.68rem] px-2 py-[3px] rounded-lg bg-muted/60 text-muted-foreground font-medium leading-tight",
										children: a.trim()
									}, idx))
								})]
							}, f.id))
						})]
					}, categoria))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/30 py-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-xs text-muted-foreground/50 tracking-wide",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Fórmula Plus — Farmácia de Manipulação"
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!viewingFormula,
				onOpenChange: (o) => !o && setViewingFormula(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md rounded-2xl border-border/50 p-0 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 brand-gradient" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-6 pt-5 pb-6 sm:px-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
								className: "text-left mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
									className: "text-lg font-bold leading-tight pr-6",
									children: viewingFormula?.protocolo
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "font-semibold text-[0.7rem] px-2 py-0.5 rounded-md",
										children: viewingFormula?.categoria
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold text-muted-foreground tabular-nums",
										children: viewingFormula ? brl(viewingFormula.preco) : ""
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											className: "text-sm font-medium text-foreground/80",
											children: [
												"Ativos (",
												viewingFormula?.ativos.split("|").filter((a) => a.trim()).length || 0,
												")"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => handleCopy(viewingFormula?.ativos.split("|").map((a) => a.trim()).filter(Boolean).join(", ") || ""),
											className: "h-8 text-xs font-semibold px-3 rounded-lg text-primary hover:text-primary hover:bg-primary/10",
											children: [copiedAll ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 mr-1.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5 mr-1.5" }), copiedAll ? "Copiados!" : "Copiar todos"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-2 max-h-[40vh] overflow-y-auto pr-1",
										children: viewingFormula?.ativos.split("|").filter((a) => a.trim()).map((a, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/60 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium text-foreground/90 leading-tight",
												children: a.trim()
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleCopy(a.trim(), idx),
												className: "shrink-0 p-1.5 rounded-md text-muted-foreground/60 hover:text-primary hover:bg-white hover:shadow-sm transition-all",
												title: "Copiar ativo",
												children: copiedIndex === idx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-green-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
											})]
										}, idx))
									}),
									viewingFormula?.observacao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 p-3.5 rounded-xl bg-accent/50 border border-accent",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground/70 uppercase tracking-wider mb-1 block",
											children: "Observação"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-foreground/80 leading-relaxed",
											children: viewingFormula.observacao
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "mt-7 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "w-full sm:w-auto rounded-xl border-border/60 hover:bg-accent/60",
									onClick: () => {
										if (viewingFormula) openAddInCategory(viewingFormula.categoria);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1.5" }), "Adicionar nesta categoria"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => setViewingFormula(null),
									className: "w-full sm:w-auto rounded-xl",
									children: "Fechar"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editing,
				onOpenChange: (o) => {
					if (!o) {
						setEditing(null);
						setSaveError(null);
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md rounded-2xl border-border/50 p-0 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 brand-gradient" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-6 pt-5 pb-6 sm:px-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
									className: "text-lg font-bold",
									children: "Atualizar preço"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
									className: "flex items-center gap-1.5 text-sm mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground" }), editing?.protocolo]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "preco",
										className: "text-sm font-medium text-foreground/80",
										children: "Novo preço (R$)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "preco",
										inputMode: "decimal",
										value: draftPrice,
										onChange: (e) => setDraftPrice(e.target.value),
										placeholder: "0,00",
										autoFocus: true,
										className: "h-12 rounded-xl text-base bg-muted/30 border-border/50 transition-all duration-200 focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
									}),
									saveError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: saveError })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "mt-6 gap-2 sm:gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "destructive",
										className: "mr-auto rounded-xl shadow-sm hover:opacity-[0.92] transition-all",
										onClick: () => {
											if (editing && window.confirm("Tem certeza que deseja excluir esta fórmula?")) deleteMutation.mutate({ rowIndex: editing.rowIndex });
										},
										disabled: deleteMutation.isPending || priceMutation.isPending,
										children: deleteMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: "Excluindo…" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 mr-1.5" }), "Excluir"] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: () => setEditing(null),
										disabled: priceMutation.isPending || deleteMutation.isPending,
										className: "rounded-xl border-border/50",
										children: "Cancelar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: saveEdit,
										disabled: priceMutation.isPending || deleteMutation.isPending,
										className: "brand-gradient text-primary-foreground rounded-xl shadow-md shadow-primary/15 hover:opacity-[0.92] transition-all active:scale-[0.98]",
										children: priceMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: "Salvando…" }) : "Salvar"
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showAdd,
				onOpenChange: (o) => {
					if (!o) resetAddForm();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-lg rounded-2xl border-border/50 p-0 overflow-hidden max-h-[90vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 brand-gradient" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-6 pt-5 pb-6 sm:px-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
									className: "text-lg font-bold flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 text-primary" }), "Nova Fórmula"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
									className: "text-sm mt-1",
									children: "Preencha os dados abaixo. A fórmula será adicionada à planilha."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												className: "text-sm font-medium text-foreground/80 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3.5 w-3.5 text-muted-foreground" }), "Categoria"]
											}),
											existingCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: addCategoryMode === "new" ? NEW_CATEGORY_VALUE : addCategory,
												onValueChange: (val) => {
													if (val === NEW_CATEGORY_VALUE) {
														setAddCategoryMode("new");
														setAddCategory("");
													} else {
														setAddCategoryMode("existing");
														setAddCategory(val);
													}
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													className: "h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione uma categoria" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													className: "rounded-xl",
													children: [existingCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: cat,
														className: "rounded-lg",
														children: cat
													}, cat)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: NEW_CATEGORY_VALUE,
														className: "rounded-lg text-primary font-medium",
														children: "+ Criar nova categoria"
													})]
												})]
											}),
											(addCategoryMode === "new" || existingCategories.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: addNewCategory,
													onChange: (e) => setAddNewCategory(e.target.value),
													placeholder: "Nome da nova categoria",
													className: "h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex items-center gap-2 text-sm text-foreground/80 cursor-pointer w-max select-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "checkbox",
														checked: addCategoryFixed,
														onChange: (e) => setAddCategoryFixed(e.target.checked),
														className: "rounded border-border/50 text-primary focus:ring-primary/20 cursor-pointer w-4 h-4"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fixar essa categoria no final da página" })]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "add-protocolo",
											className: "text-sm font-medium text-foreground/80",
											children: "Título da fórmula"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "add-protocolo",
											value: addProtocolo,
											onChange: (e) => setAddProtocolo(e.target.value),
											placeholder: "Ex: Hormônio Bioidêntico 01",
											className: "h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "add-preco",
											className: "text-sm font-medium text-foreground/80",
											children: "Preço (R$)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "add-preco",
											inputMode: "decimal",
											value: addPreco,
											onChange: (e) => setAddPreco(e.target.value),
											placeholder: "0,00",
											className: "h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "add-ativos",
											className: "text-sm font-medium text-foreground/80",
											children: [
												"Ativos",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground font-normal",
													children: "(separar com |)"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "add-ativos",
											value: addAtivos,
											onChange: (e) => setAddAtivos(e.target.value),
											placeholder: "Estradiol | Progesterona | DHEA",
											className: "h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "add-obs",
											className: "text-sm font-medium text-foreground/80",
											children: [
												"Observação",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground font-normal",
													children: "(opcional)"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "add-obs",
											value: addObs,
											onChange: (e) => setAddObs(e.target.value),
											placeholder: "Notas adicionais",
											className: "h-11 rounded-xl bg-muted/30 border-border/50 transition-all focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
										})]
									}),
									addError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: addError })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "mt-7 gap-2 sm:gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: resetAddForm,
									disabled: addMutation.isPending,
									className: "rounded-xl border-border/50",
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: submitAdd,
									disabled: addMutation.isPending,
									className: "brand-gradient text-primary-foreground rounded-xl shadow-md shadow-primary/15 hover:opacity-[0.92] transition-all active:scale-[0.98]",
									children: addMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: "Adicionando…" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Adicionar"]
									})
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!renamingCategory,
				onOpenChange: (o) => {
					if (!o) {
						setRenamingCategory(null);
						setRenameError(null);
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md rounded-2xl border-border/50 p-0 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 brand-gradient" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-6 pt-5 pb-6 sm:px-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
									className: "text-lg font-bold flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPen, { className: "h-5 w-5 text-primary" }), "Renomear Categoria"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
									className: "text-sm mt-1",
									children: [
										"Todas as fórmulas da categoria",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-foreground",
											children: [
												"\"",
												renamingCategory,
												"\""
											]
										}),
										" serão atualizadas na planilha."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "rename-cat",
										className: "text-sm font-medium text-foreground/80",
										children: "Novo nome"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "rename-cat",
										value: renameValue,
										onChange: (e) => setRenameValue(e.target.value),
										placeholder: "Nome da categoria",
										autoFocus: true,
										className: "h-12 rounded-xl text-base bg-muted/30 border-border/50 transition-all duration-200 focus:bg-white focus:border-ring focus:ring-2 focus:ring-ring/20"
									}),
									renameError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBanner, { message: renameError })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "mt-6 gap-2 sm:gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setRenamingCategory(null),
									disabled: renameMutation.isPending,
									className: "rounded-xl border-border/50",
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: submitRename,
									disabled: renameMutation.isPending || !renameValue.trim(),
									className: "brand-gradient text-primary-foreground rounded-xl shadow-md shadow-primary/15 hover:opacity-[0.92] transition-all active:scale-[0.98]",
									children: renameMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: "Renomeando…" }) : "Renomear"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
function ErrorBanner({ message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 rounded-xl bg-destructive/8 border border-destructive/15 px-3.5 py-2.5 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-destructive shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-destructive font-medium",
			role: "alert",
			children: message
		})]
	});
}
function Spinner({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }), label]
	});
}
//#endregion
export { AtivosPage as component };
