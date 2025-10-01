const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Behaviors.scrollto,
		C3.Behaviors.DragnDrop,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.Plugins.System.Acts.SetVar,
		C3.Plugins.Sprite.Acts.SetAnim,
		C3.Plugins.Sprite.Acts.SetInstanceVar,
		C3.Plugins.Sprite.Exps.AnimationFrame,
		C3.Plugins.Sprite.Acts.SetVisible,
		C3.Plugins.System.Cnds.ForEach,
		C3.Behaviors.DragnDrop.Cnds.OnDrop,
		C3.Plugins.Sprite.Cnds.IsOverlapping,
		C3.Plugins.Sprite.Cnds.CompareInstanceVar,
		C3.Plugins.Sprite.Acts.SetPosToObject,
		C3.Plugins.Sprite.Acts.SetBoolInstanceVar,
		C3.Plugins.System.Acts.Wait,
		C3.Plugins.Sprite.Cnds.CompareFrameTag,
		C3.Behaviors.DragnDrop.Acts.SetEnabled,
		C3.Plugins.System.Acts.AddVar
	];
};
self.C3_JsPropNameTable = [
	{DéfilerVers: 0},
	{art: 0},
	{id: 0},
	{GlisserDéposer: 0},
	{Sprite2: 0},
	{occupé: 0},
	{grid: 0},
	{overlap: 0},
	{Sprite: 0},
	{completed: 0},
	{count: 0}
];

self.InstanceType = {
	art: class extends self.ISpriteInstance {},
	Sprite2: class extends self.ISpriteInstance {},
	grid: class extends self.ISpriteInstance {},
	overlap: class extends self.ISpriteInstance {},
	Sprite: class extends self.ISpriteInstance {}
}