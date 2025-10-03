const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Behaviors.scrollto,
		C3.Behaviors.DragnDrop,
		C3.Plugins.Text,
		C3.Plugins.Touch,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.Plugins.System.Acts.SetVar,
		C3.Plugins.Sprite.Acts.SetAnim,
		C3.Plugins.Sprite.Acts.SetInstanceVar,
		C3.Plugins.Sprite.Exps.AnimationFrame,
		C3.Plugins.Sprite.Acts.SetVisible,
		C3.Plugins.System.Cnds.ForEach,
		C3.Plugins.Sprite.Acts.SetPos,
		C3.Plugins.System.Exps.random,
		C3.Behaviors.DragnDrop.Cnds.OnDrop,
		C3.Plugins.Sprite.Cnds.IsOverlapping,
		C3.Plugins.Sprite.Cnds.CompareInstanceVar,
		C3.Plugins.Sprite.Acts.SetPosToObject,
		C3.Plugins.System.Acts.AddVar,
		C3.Plugins.Sprite.Acts.SetBoolInstanceVar,
		C3.Plugins.System.Acts.Wait,
		C3.Plugins.Sprite.Cnds.CompareFrameTag,
		C3.Behaviors.DragnDrop.Acts.SetEnabled,
		C3.Plugins.System.Cnds.Compare,
		C3.Plugins.Sprite.Acts.AddRemoveAnimationFrame,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Plugins.Text.Acts.SetText,
		C3.Plugins.Touch.Cnds.OnTapGestureObject,
		C3.Plugins.Sprite.Acts.SetScale,
		C3.Plugins.System.Acts.RestartLayout
	];
};
self.C3_JsPropNameTable = [
	{DéfilerVers: 0},
	{art: 0},
	{id: 0},
	{GlisserDéposer: 0},
	{piecePuzzle: 0},
	{occupé: 0},
	{grid: 0},
	{overlap: 0},
	{atificeDeFin: 0},
	{TxtDebug: 0},
	{flecheRetour: 0},
	{Toucher: 0},
	{PiecesCorrectes: 0},
	{completed: 0},
	{count: 0}
];

self.InstanceType = {
	art: class extends self.ISpriteInstance {},
	piecePuzzle: class extends self.ISpriteInstance {},
	grid: class extends self.ISpriteInstance {},
	overlap: class extends self.ISpriteInstance {},
	atificeDeFin: class extends self.ISpriteInstance {},
	TxtDebug: class extends self.ITextInstance {},
	flecheRetour: class extends self.ISpriteInstance {},
	Toucher: class extends self.IInstance {}
}